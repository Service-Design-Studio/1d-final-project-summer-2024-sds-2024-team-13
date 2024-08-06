import React from 'react';
import TopNav from '../TopNav';
import styles from "../../styles/refunds/RefundConfirm.module.css";

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
        setShowOverlay(false);
    };

    if (!transaction) {
        return null; // Return null if transaction is undefined to avoid errors
    }

    return (
        <div className={styles.main} style={(showOverlay) ? {display: "block"} : {display: "none"}}>
            <TopNav
                title="Review Request"
                pathname={-1}
                hasBackButton="yes"
                handleBack={handleBack} // Pass handleBack to TopNav
            />
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
                            <p className={styles.cardLabel}>Reason(s) for Refund</p>
                            <p className={styles.cardValue}>{(reason === "") ? "N.A" : reason}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => createRefundRequest()} className={styles.confirmButton} data-testid="confirm-refund-button">Confirm Refund</button>
            </div>
        </div>
    );
};

export default RefundConfirm;
