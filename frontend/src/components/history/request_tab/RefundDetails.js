import { ChevronLeft } from "@mui/icons-material";
import styles from "../styles/transactions/RefundDetails.module.css"

const RefundDetails = () => {
    return ( 
        <div className={styles.screen}>
            <div className={styles.header}>
                <ChevronLeft style={{position:"absolute", top: "25%", left: "1rem"}} fontSize="large"/>
                <h1>Refund Details</h1>
            </div>

            <p className={styles.title}>Refund pending</p>
            <p className={styles.subtitle}>The refund request is pending action from you.</p>

            <p className={styles.paymentLabel}>Payment Details</p>

            <div className={styles.box}>
                <p className={styles.label}>You've Paid</p>
                <p className={styles.amount}>SGD 530.00</p>
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
                <p className={styles.transactionID}>PAY473247563748</p>
            </div>

            <div className={styles.box}>
                <div className={styles.refundInfoItem}>
                    <p className={styles.refundLabel}>EXPECTED PAYMENT FROM CUSTOMER</p>
                    <p className={styles.refundDetails}>S$ 5.30</p>
                </div>
                <div className={styles.refundInfoItem}>
                    <p className={styles.refundLabel}>REASON(S) FOR REFUND</p>
                    <p className={styles.refundDetails}>customer supposed to pay 5.30 so i refund him</p>
                </div>
            </div>

            <div className={styles.refundAmount}>
                <h3>REFUND</h3>
                <h3>S$ 524.70</h3>
            </div>

            <div className={styles.buttons}>
                <button className={styles.decline}>DECLINE</button>
                <button className={styles.accept}>ACCEPT</button>
            </div>
        </div>


     );
}
 
export default RefundDetails;