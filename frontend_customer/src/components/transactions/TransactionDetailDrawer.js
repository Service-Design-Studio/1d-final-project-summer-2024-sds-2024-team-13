import { SwipeableDrawer } from "@mui/material";
import styles from "../../styles/transactions/TransactionDetailDrawer.module.css"

const TransactionDetailDrawer = ({
    toggleDrawer, isOpen
}) => {
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
                    <h1 className = {styles.amount}>SGD<span>13.40</span> </h1>
                    <h4 className = {styles.timestamp}> 06:34:02 PM </h4>
                </div>
                <div className={styles.bottom}>
                    <div>
                    <p className = {styles.label}>Payment Method</p>
                    <p className = {styles.property}>PayNow</p>
                    <p className = {styles.label}>Transaction ID</p>
                    <p className = {styles.property}>446732846</p>
                    <p className = {styles.label}>Merchant Name</p>
                    <p className = {styles.property}>81234567</p>
                    </div>
                    <button className = {styles.refundButton}>REQUEST REFUND</button>
                </div>

            </div>
        </SwipeableDrawer>
     );
}
 
export default TransactionDetailDrawer;