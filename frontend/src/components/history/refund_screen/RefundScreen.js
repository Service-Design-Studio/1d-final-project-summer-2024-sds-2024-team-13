import { useState } from 'react';
import RefundNav from './RefundNav';
import styles from "../../../styles/history/refund_screen/RefundScreen.module.css";

const RefundScreen = () => {
    const [reason, setReason] = useState("");
    const [expectedPayment, setExpectedPayment] = useState("");

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

    return (
        <div className={styles.screen}>
            <RefundNav />
            <div className={styles.content}>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Payment</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span>Customer paid</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD 530.00</span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span>Paid to</span>
                        <span><b>Lai Lai Wanton Mee</b></span>
                    </div>
                    <div className={styles.row}>
                        <span>Paid by</span>
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        <span>Date and Time</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>17 Jul 2024, 09:41:21 AM</b></span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span>Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>PAYLAH18296309271973212</b></span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <h3>Expected Payment from Customer</h3>
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
                        <h3>Reason(s) for Refund</h3>
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
                        <h3>Amount to be Refunded</h3>
                        <span className={styles.refundAmount}>S$ 0.00</span>
                    </div>
                </div>
                <button className={styles.submitButton}>SUBMIT</button>
            </div>
        </div>
    );
};

export default RefundScreen;
