import {useState} from 'react'
import styles from "./styles.module.css";

function Toggle({label = '', toggled = false, callBack = () => {}}) {
    const [isToggle, setIsToggle] = useState(toggled);

    const toggleClick = () => {
        setIsToggle(!isToggle)
        callBack(!isToggle)
    }

  return (
    
        <label className={styles.label}>
            <div className={styles.strong}>{label}</div>
            <input type="checkbox" defaultChecked={isToggle} onClick={toggleClick} className={styles.input} />
            <span className={styles.span}/>
        </label>
  
  )
}

export default Toggle