import styles from "../../styles/refunds/RefundConfirm.module.css"
import { ArrowBackIosNew } from "@mui/icons-material";

const RefundConfirm = ({
    showOverlay,
    setShowOverlay,
    reason,
    transaction,
    expectedPayment,
    expectedRefund,
    createRefundRequest
}) => {
    const handleBack = () => {
        setShowOverlay(false)
    }
    return (
        <div className={styles.main} style={(showOverlay) ? {display: "block"} : {display: "none"}}>
            <div className={styles.confirmHeader}>
                <button className={styles.backButton} onClick={() => handleBack()}>
                    <ArrowBackIosNew />
                </button>
                <h2 className={styles.title}>Review Request</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.top}>
                        <p className={styles.cardLabel}>Refund Amount</p>
                        <div className={styles.cardRow}>
                            <p className={styles.currency}>SGD</p>
                            <div className={styles.refundAmount}>{parseFloat(expectedRefund).toFixed(2)}</div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.subsection}>
                            <p className={styles.cardLabel}>Paid to</p>
                            <p className={styles.cardValue}>{transaction.customer_number}</p>
                        </div>
                        <div className={styles.subsection}>
                            <p className={styles.cardLabel}>Original Payment</p>
                            <p className={styles.cardValue}>SGD {transaction.amount}</p>
                        </div>
                        <div className={styles.subsection}>
                            <p className={styles.cardLabel}>Expected Payment from Customer</p>
                            <p className={styles.cardValue}>SGD {parseFloat(expectedPayment).toFixed(2)}</p>
                        </div>
                        <div className={styles.subsection}>
                            <p className={styles.cardLabel}>Resaons(s) for Refund</p>
                            <p className={styles.cardValue}>{(reason === "") ? "N.A" : reason}</p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>createRefundRequest()} className={styles.confirmButton}>Confirm Refund</button>
            </div>
        </div>
    );
}

export default RefundConfirm;