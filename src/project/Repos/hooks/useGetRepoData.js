import {useState, useEffect, useRef} from "react"
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from "../utils/contants";

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
            sort: rest?.sort || undefined,
            order: rest?.order || undefined,
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
            const res = await fetch(`https://api.github.com/search/repositories?${paramsString}`)
            if(res?.ok){
                const resp_data = await res.json();
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