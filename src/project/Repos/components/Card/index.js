import Image from "next/image"
import { getFormattedDate } from "../../utils/getFormattedDate"
import styles from "./styles.module.css"

function Card({cardItem = {}}) {

    const navigateToRepo = () => {
        window.open(cardItem?.html_url, "_blank")
    }

  return (
    <div className={styles.card_container}>
        <div className={styles.card_header}>
            <Image src={cardItem?.owner?.avatar_url} alt="avatar" width={50} height={50} className={styles.image}/>
            <div className={styles.repo_name} onClick={navigateToRepo}>
                {cardItem?.full_name}
            </div>
        </div>
        <div className={styles.card_body}>
            <div className={styles.topics_container}>
                {cardItem?.topics?.map((topic) => 
                <div key={topic} className={styles.topic}>
                    {topic}
                </div>)}
            </div>
            <div className={styles.other_container}>
                {cardItem?.language ? <><div className={styles.language}>{cardItem?.language}</div> &#183;</> : null} 
                 <div>&#9734; {cardItem?.stargazers_count}</div>
                &#183; <div>{getFormattedDate(cardItem?.updated_at)}</div>
            </div>
            <div className={styles.details_container}>
                {cardItem?.description}
            </div>
        </div>
    </div>
  )
}

export default Card