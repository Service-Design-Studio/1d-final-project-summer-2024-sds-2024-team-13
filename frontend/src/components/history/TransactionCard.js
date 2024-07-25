import styles from "../../styles/history/TransactionCard.module.css"
import { ChevronRightOutlined } from "@mui/icons-material";

const TransactionCard = ({
    transaction,
    toggleDrawer,
    setSelectedTransaction
}) => {
    //TEMP
    const status = ""
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };
    return ( 
        <div 
            className={styles.main} 
            onClick={(event) => {
            setSelectedTransaction(transaction)
            toggleDrawer(true)(event);
        }}
            style={(status === "PENDING") ? {borderLeft: "7px solid #E7B416"} : (status === "REFUNDED") ? {borderLeft: "7px solid #AAA"} : (status === "REJECTED") ? {borderLeft: "7px solid #EB3223"} : {borderLeft: "1px solid #d3d3d3"}}
        >
            <div className={styles.top}>
                <p style={{margin: 0, fontWeight: 600, fontSize: "0.8rem"}}>TRANSFER FROM {transaction.payment_method.toUpperCase()}: <br/>{transaction.customer_number}</p>
                <ChevronRightOutlined/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>{formatTimestamp(transaction.created_at)}</p>
                <h3 className={styles.amount}>SGD <span>{parseFloat(transaction.amount).toFixed(2)}</span></h3>
            </div>
            {(status==="PENDING") ? <p className={styles.status} style={{color: "#E7B416"}}>REFUND REQUESTED</p> :<></>}
            {(status==="REFUNDED") ? <p className={styles.status} style={{color: "#aaa"}}>REFUNDED</p> :<></>}
            {(status==="REJECTED") ? <p className={styles.status} style={{color: "#EB3223"}}>REFUND REJECTED</p> :<></>}

        </div>
     );
}
export default TransactionCard;