import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from "../../utils/contants"
import Card from "../Card"
import Loader from "../Loader"
import Pagination from "../Pagination"
import Toggle from "../Toggle"

import styles from "./styles.module.css"

function CardList({
    loading= false, 
    data = {}, 
    filters = {}, 
    setFilters = () => {}
}) {
  
    if(loading){
        return <div className={styles.container}>
            <Loader />
            </div>
    }

    if(Object.keys(data)?.length === 0){
        return <div className={`${styles.container} ${styles.text}`}>
            Please Search Something !!
        </div>
    }


    if(data?.items?.length === 0){
        return <div className={`${styles.container} ${styles.text}`}>No Results Found!!</div>
    }

  return (
    <div className={styles.container}>
        <Toggle label="Ascending" toggled={filters?.order === 'asc'} 
        callBack={(toggle) => toggle ? 
        setFilters((prev) => ({...prev, page: DEFAULT_PAGE, order: 'asc'})) 
        : setFilters((prev) => ({...prev, page: DEFAULT_PAGE, order: 'desc'}))}
        />  
        {data?.items?.map((cardItem) => 
        <Card key={cardItem?.id} cardItem={cardItem}
        />)}
        <Pagination 
        page={filters?.page}
        defaultPage={DEFAULT_PAGE}
        pageLimit={DEFAULT_PAGE_LIMIT}
        total_count={data?.total_count}
        setPage={(val) => setFilters((prev) => ({...prev, page: val}))}
        />
    </div>
  )
}

export default CardList