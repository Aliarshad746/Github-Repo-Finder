import styles from "./styles.module.css"
import {getConstantArray} from "../../utils/getConstantArray"

const CARDS = getConstantArray(4);
const TOPIC_ARRAY = getConstantArray(5);
const OTHER_ARRAY = getConstantArray(3);
const DETAIL_ARRAY = getConstantArray(2);

function Loader() {
  return (
    <>
    {CARDS.map((card) => <div className={styles.card_container} key={card}>
        <div className={styles.card_header}>
            <div className={`${styles.skeleton} ${styles.circle}`}></div>
            <div className={`${styles.skeleton} ${styles.skeleton_heading}`}></div>
        </div>
        <div className={styles.card_body}>
            <div className={styles.topics_container}>
                {TOPIC_ARRAY.map((topic) => 
                <div key={topic} className={`${styles.skeleton_topic} ${styles.skeleton}`}>
                </div>)}
            </div>
            <div className={styles.topics_container}>
            {OTHER_ARRAY.map((other) => 
                <div key={other} className={`${styles.skeleton_topic} ${styles.skeleton}`}>
                </div>)}
            </div>
            <div className={styles.details_container}>
            {DETAIL_ARRAY.map((detail) => 
                <div key={detail} className={`${styles.skeleton_detail} ${styles.skeleton}`}>
                </div>)}
            </div>
        </div>
    </div>)}
    </>
    
  )
}

export default Loader