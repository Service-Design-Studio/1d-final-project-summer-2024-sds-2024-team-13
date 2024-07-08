import { Notifications, Refresh } from "@mui/icons-material";
import styles from "../../styles/Home/HomeNav.module.css"

const HomeNav = ({
    handleReload
}) => {
    return ( 
        <div className={styles.main}>
            <Notifications className={styles.icon}/>
            <h2><span>DBS</span>Biz</h2>
            <button onClick={() => handleReload()}><Refresh className={styles.icon}/></button>
            
        </div>
     );
}
 
export default HomeNav;