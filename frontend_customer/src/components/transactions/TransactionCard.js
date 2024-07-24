import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/transactions/TransactionCard.module.css"

const TransactionCard = ({
    toggleDrawer,
    transaction,
    setSelectedTransaction
}) => {
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
    };
    

    return ( 
        <div className={styles.main} onClick={(event) => {
            setSelectedTransaction(transaction)
            toggleDrawer(true)(event)
            
            }}>
            <div className={styles.top}>
                <p className={styles.title}>HAWKER NAME</p>
                <ChevronRight/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>{formatTimestamp(transaction.created_at)}</p>
                <p>SGD <span>{parseFloat(transaction.amount).toFixed(2)}</span></p>
            </div>
        </div>
     );
}
 
export default TransactionCard;