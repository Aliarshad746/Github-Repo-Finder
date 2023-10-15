import {useState, useEffect, useRef} from "react"
import { BACKEND_SORT_OPTIONS, DEFAULT_PAGE, DEFAULT_PAGE_LIMIT, GITHUB_REPO_API } from "../utils/contants";

 const formatData = (resp_data, sort, order = 'desc') => {
    if(sort !== 'created_at'){
        resp_data?.items?.sort((a,b) => order === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort])
    }else{
        resp_data?.items?.sort((a,b) => {
            const timeFirst = new Date(a[sort]).getTime();
            const secondTime = new Date(b[sort]).getTime();
            return order === 'desc'? secondTime - timeFirst : timeFirst - secondTime;
        })
    }
 }

const useGetReposData = () => {
    const [filters, setFilters] = useState({page: DEFAULT_PAGE});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const initialCall = useRef(false);

    const {q = '', ...rest} = filters || {};

    const getRepoData = async() => {
        setLoading(true)

        const params = {
            q: q || undefined,
            page: rest?.page,
            order: rest?.order || undefined,
            sort: (rest?.sort && BACKEND_SORT_OPTIONS.includes(rest.sort)) ? rest?.sort : undefined, // because backend has only 4 sort, options So doing sorting on frontend
            per_page: DEFAULT_PAGE_LIMIT,
        }

        const paramsString = Object.entries(params).reduce((acc, [key, value]) => {
            if(value && acc){
                return `${acc}&${key}=${value}`
            }else if(value){
                return `${key}=${value}`
            }
            return acc;
        }, '')

        try {
            const res = await fetch(`${GITHUB_REPO_API}?${paramsString}`)
            if(res?.ok){
                const resp_data = await res.json();
                if(rest?.sort && !BACKEND_SORT_OPTIONS.includes(rest?.sort)){
                    formatData(resp_data, rest?.sort, rest?.order);
                }
                setData(resp_data)
            }else{
                setData({});
            }

        } catch (error) {
            console.error(error);
            setData({});
            
        }
        setLoading(false);
    }

    useEffect(()=> {
        if(initialCall.current){
            getRepoData();
        }
    }, [JSON.stringify(rest)])

    useEffect(() => {
        if(initialCall.current){
        const timeOut = setTimeout(() => getRepoData(), 600);
        return () => clearTimeout(timeOut);
        }
    }, [q])

    return {
        setFilters,
        loading,
        data,
        filters,
        initialCall,
    }


}

export default useGetReposData;