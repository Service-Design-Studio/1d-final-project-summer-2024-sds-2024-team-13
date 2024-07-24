import { SwipeableDrawer } from "@mui/material";
import styles from "../../styles/transactions/TransactionDetailDrawer.module.css"

const TransactionDetailDrawer = ({
    toggleDrawer, isOpen, transaction
}) => {
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };
    return ( 
        <SwipeableDrawer 
        className = {styles.main} 
        anchor = "bottom"
        open = {isOpen}
        onClose = {(event) => {
            toggleDrawer(false)(event);
        }}
        onOpen = {(event) => {
            toggleDrawer(true)(event);
        }}
        >
            <div className={styles.content}>
                <div className={styles.swipeBar}></div>
                <div className={styles.top}>
                    <h3>You've paid</h3>
                    <h1 className = {styles.amount}>SGD<span>{parseFloat(transaction.amount).toFixed(2)}</span> </h1>
                    <h4 className = {styles.timestamp}>{formatDate(transaction.created_at)} • {formatTimestamp(transaction.created_at)}</h4>
                </div>
                <div className={styles.bottom}>
                    <div>
                    <p className = {styles.label}>Payment Method</p>
                    <p className = {styles.property}>{transaction.payment_method}</p>
                    <p className = {styles.label}>Transaction ID</p>
                    <p className = {styles.property}>{transaction.id}</p>
                    <p className = {styles.label}>Merchant Name</p>
                    <p className = {styles.property}>HAWKER NAME</p>
                    </div>
                    <button className = {styles.refundButton}>REQUEST REFUND</button>
                </div>

            </div>
        </SwipeableDrawer>
     );
}
 
export default TransactionDetailDrawer;