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
    const status = transaction.status.toUpperCase()

    return ( 
        <div className={styles.main} onClick={(event) => {
            setSelectedTransaction(transaction)
            toggleDrawer(true)(event)
            
            }}
            style={(status === "PENDING") ? {borderLeft: "7px solid #E7B416"} : (status === "REFUNDED") ? {borderLeft: "7px solid #2DC937"} : (status === "REJECTED") ? {borderLeft: "7px solid #EB3223"} : {borderLeft: "1px solid #d3d3d3"}}>
            <div className={styles.top}>
                <p className={styles.title}>{transaction.user_name}</p>
                <ChevronRight/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>{formatTimestamp(transaction.created_at)}</p>
                <p style={(status==="REFUNDED") ? {color: "#2DC937"} : {color: "#000"}}>SGD {(status==="REFUNDED")? "+" :""}<span>{parseFloat(transaction.amount).toFixed(2)}</span></p>
            </div>
            {(status==="PENDING") ? <p className={styles.status} style={{color: "#E7B416"}}>REFUND REQUESTED</p> :<></>}
            {(status==="REFUNDED") ? <p className={styles.status} style={{color: "#2DC937"}}>REFUND</p> :<></>}
            {(status==="REJECTED") ? <p className={styles.status} style={{color: "#EB3223"}}>REFUND REJECTED</p> :<></>}

        </div>
     );
}
 
export default TransactionCard;