"use client";
import CardList from "./components/CardList";
import Toggle from "./components/Toggle";
import useGetReposData from "./hooks/useGetRepoData"
import styles from "./styles.module.css"
import {OPTIONS, DEFAULT_PAGE} from "./utils/contants"


function Repos() {
    const {loading, data, setFilters, filters, initialCall} = useGetReposData();
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input type="text" 
          placeholder="Search Repository...." 
          value={filters?.q}
          onChange={(e) => {
            setFilters({
            q: e.target.value, 
            page: DEFAULT_PAGE});
            initialCall.current = true;
            }
          }
          />
          <select placeholder="Sort By...." 
          onChange={(e) => setFilters(
            (prev)=> ({...prev, 
            page: DEFAULT_PAGE, 
            sort: e.target.value,
            order: prev?.order ? 'desc' : undefined,
            }))} 
            value={filters?.sort}
            >
            <option>Sort By ...</option>
            {OPTIONS.map((item) => <option 
            key={item?.value} 
            value={item?.value}>
              {item?.label}
            </option>)}
          </select>
      </div>
        <CardList 
        data={data} 
        loading={loading} 
        setFilters={setFilters} 
        filters={filters}  />
    </div>
  )
}

export default Repos