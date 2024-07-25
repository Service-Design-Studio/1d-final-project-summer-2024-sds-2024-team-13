import styles from "../../styles/refunds/RefundRejectReason.module.css"
import { ArrowBackIosNew } from "@mui/icons-material";
import { TextareaAutosize } from '@mui/base';
const RefundRejectReason = ({
    refund,
    transaction,
    formatDate,
    formatTimestamp,
    showOverlay, 
    setShowOverlay,
    declineRefundRequest,
    reply,
    setReply
}) => {
    const handleBack = () => {
        setShowOverlay(false);
        setReply("");
    }
    return (
        <div className={styles.main} style={(showOverlay) ? {display: "block"} : {display: "none"}}>
            <div className={styles.rejectHeader}>
                <button className={styles.backButton} onClick={()=>handleBack()}>
                    <ArrowBackIosNew />
                </button>
                <h2 className={styles.title}>Decline Refund</h2>
            </div>
            <div className={styles.detailsSection}>
                <p className={styles.detailLabel}>Requested Refund Amount:</p>
                <p className={styles.detailValueLarge}>SGD {parseFloat(refund?.refund_amount).toFixed(2)}</p>
                <p className={styles.detailLabel}>Recipient's Contact:</p>
                <p className={styles.detailValue}>{transaction?.customer_number}</p>
                <p className={styles.detailLabel}>Request Date:</p>
                <p className={styles.detailValue}>{formatDate(refund?.created_at)}, {formatTimestamp(refund?.created_at)}</p>
                <p className={styles.detailLabel}>Reason for Refund:</p>
                <p className={styles.detailValue}>{(refund?.request_reason && refund?.request_reason !== "") ? refund?.request_reason : "N.A"}</p>
            </div>
            <h3 className={styles.subheading}>Please state the reason for declining the refund request</h3>
            <div className={styles.inputHeader}>
                <p>Message:</p>
            </div>
            <TextareaAutosize value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Add comments" className={styles.messageInput} />
            <button onClick={() => declineRefundRequest(reply)} className={(reply==="") ? styles.disabledConfirmButton : styles.confirmButton} disabled={reply===""} >DECLINE REQUEST</button>
        </div>

    );
}

export default RefundRejectReason;