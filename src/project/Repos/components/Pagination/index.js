import styles from "./styles.module.css"

const PAGE_OFFSET = 1;

function Pagination({
  page = 0, 
  defaultPage = 0, 
  pageLimit = 0, 
  total_count= 0,
  setPage = () => {}
}){
  const currentPage = page || defaultPage;
  const totalPages = Math.floor(total_count / pageLimit) + PAGE_OFFSET;

  const isPreviousDisabled = page === defaultPage;
  const isNextPageDisabled = page === totalPages;

  return (
    <div className={styles.pagination_container}>
      <button 
      disabled={isPreviousDisabled} 
      onClick={() => setPage(page - PAGE_OFFSET)}>
        Previous
      </button>
        Page: {currentPage} of {totalPages}
      <button 
      disabled={isNextPageDisabled} 
      onClick={() => setPage(page + PAGE_OFFSET)}>
        Next
      </button>
    </div>
  )
}

export default Pagination