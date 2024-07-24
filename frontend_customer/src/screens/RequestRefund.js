import { ChevronLeft } from "@mui/icons-material";
import styles from "../styles/transactions/RequestRefund.module.css"

const RequestRefund = () => {
    return ( 
        <div className={styles.screen}>
            <div className={styles.header}>
                <ChevronLeft style={{position:"absolute", top: "25%", left: "1rem"}} fontSize="large"/>
                <h1>Request Refund</h1>
            </div>
            <div className={styles.content}>
                <p className={styles.paymentLabel}>Payment</p>
            </div>

            <div className={styles.box}>
                <p className={styles.label}>Customer Paid</p>
                <p className={styles.amount}>SGD 36.00</p>
            </div>

            <div className={styles.box}>
                <div className={styles.propertyItem}>
                    <p className={styles.label}>Paid to</p>
                    <p className={styles.property}>Lai Lai Wanton Mee</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={styles.label}>Paid by</p>
                    <p className={styles.property}>9XXX XXXX</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={styles.label}>Date and Time</p>
                    <p className={styles.property}>14 Jul 2024, 02:34:19 PM</p>
                </div>
            </div>
                
            <div className={styles.box}>
                <p className={styles.label}>Transaction ID</p>
                <p className={styles.transactionID}>PAYefhewiff</p>
            </div>

            <div className={styles.refundInfo}>
                <div className={styles.refundInfoItem}>
                    <p className={styles.refundLabel}>EXPECTED PAYMENT FROM CUSTOMER</p>
                    <input className={styles.refundInput} placeholder="Enter Amount"></input>
                </div>
                <div className={styles.refundInfoItem}>
                    <p className={styles.refundLabel}>REASON(S) FOR REFUND</p>
                    <input className={styles.refundInput} placeholder="Enter Reason (Optional)"></input>
                </div>
                <div className={styles.refundAmount}>
                    <h3>AMOUNT TO BE REFUNDED</h3>
                    <h4>S$ 32.40</h4>
                </div>
            </div>

            <button className={styles.submitButton}>SUBMIT</button>
        </div>
     );
}
 
export default RequestRefund;