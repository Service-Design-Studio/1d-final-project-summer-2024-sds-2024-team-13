import { Notifications } from "@mui/icons-material";
import styles from "../../styles/Home/HomeNav.module.css"
import dbsIcon from "../../assets/dbsIcon.svg"

const HomeNav = () => {
    return ( 
        <div className={styles.main}>
            <Notifications className={styles.icon}/>
            <h2><span>DBS</span>Biz</h2>
            <img src={dbsIcon} alt=""/>
            
        </div>
     );
}
 
export default HomeNav;