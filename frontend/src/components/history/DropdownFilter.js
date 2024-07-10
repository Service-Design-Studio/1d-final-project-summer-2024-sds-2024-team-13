import {ArrowDropDown, CalendarToday } from "@mui/icons-material";
import styles from "../../styles/history/DropdownFilter.module.css"
const DropdownFilter = () => {
    return ( 
        <div className={styles.main}>
            <div style={{display: "flex", alignItems:"center"}}>
                <CalendarToday/>
                <p style={{marginLeft: "8px"}}>This Month (JUN)</p>
            </div>
            <ArrowDropDown/>
        </div>
     );
}
 
export default DropdownFilter;