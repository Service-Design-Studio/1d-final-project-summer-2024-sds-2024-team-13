import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/transactions/TransactionCard.module.css"

const TransactionCard = ({
    toggleDrawer
}) => {
    return ( 
        <div className={styles.main} onClick={(event) => {
            toggleDrawer(true)(event)
            
            }}>
            <div className={styles.top}>
                <p className={styles.title}>LAI LAI WANTON MEE</p>
                <ChevronRight/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>02:34:19 PM</p>
                <p>SGD <span>36.00</span></p>
            </div>
        </div>
     );
}
 
export default TransactionCard;