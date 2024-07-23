import { useState } from 'react';
import RefundNav from './RefundNav';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from "../../../styles/history/refund_screen/RefundScreen.module.css";

const RefundScreen = () => {
    const [reason, setReason] = useState("");
    const [expectedPayment, setExpectedPayment] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleReasonChange = (e) => {
        if (e.target.value.length <= 250) {
            setReason(e.target.value);
        }
    };

    const handleExpectedPaymentChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for the dot
        if (!isNaN(value) && value.match(/^(\d+(\.\d{0,2})?)?$/)) { // Allow only valid number with up to 2 decimal places
            setExpectedPayment(value);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const isButtonDisabled = !reason || !expectedPayment;

    return (
        <div className={styles.screen}>
            <RefundNav />
            <div className={styles.content}>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Payment</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Customer paid</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD 530.00</span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid to</span>
                        <span><b>Lai Lai Wanton Mee</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid by</span>
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Date and Time</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>17 Jul 2024, 09:41:21 AM</b></span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>PAYLAH18296309271973212</b></span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Expected Payment from Customer</div>
                        <div className={styles.inputWrapper}>
                            <span className={styles.prefix}>S$</span>
                            <input 
                                type="text" 
                                placeholder="0.00" 
                                className={styles.input} 
                                value={expectedPayment}
                                onChange={handleExpectedPaymentChange}
                            />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Reason(s) for Refund</div>
                        <input 
                            type="text" 
                            placeholder="Add comments" 
                            className={styles.input} 
                            value={reason}
                            onChange={handleReasonChange}
                        />
                        <div className={styles.charCount}>{reason.length}/250</div>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Amount to be Refunded</div>
                        <span className={styles.refundAmount}>S$ 0.00</span>
                    </div>
                </div>
                {!isSubmitted ? (
                    <button
                        className={`${styles.submitButton} ${isButtonDisabled ? styles.disabledButton : ''}`}
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                    >
                        SUBMIT
                    </button>
                ) : (
                    <div className={styles.submittedMessage}>
                        <CheckCircleIcon className={styles.successIcon} />
                        <span>SUBMITTED!</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RefundScreen;
