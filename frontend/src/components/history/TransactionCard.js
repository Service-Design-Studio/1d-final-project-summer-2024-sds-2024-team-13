import styles from "../../styles/history/TransactionCard.module.css"
import { ChevronRightOutlined } from "@mui/icons-material";

const TransactionCard = ({
    transaction
}) => {
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };
    return ( 
        <div className={styles.main}>
            <div className={styles.top}>
                <p style={{margin: 0, fontWeight: 600, fontSize: "0.8rem"}}>TRANSFER FROM {transaction.payment_method.toUpperCase()}: <br/>8XXX XXXX</p>
                <ChevronRightOutlined/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>{formatTimestamp(transaction.created_at)}</p>
                <h3 className={styles.amount}>SGD <span>{parseFloat(transaction.amount).toFixed(2)}</span></h3>

            </div>
        </div>
     );
}
export default TransactionCard;