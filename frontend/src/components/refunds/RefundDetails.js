import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundDetails.module.css";

const RefundDetails = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCancel = () => {
        navigate('/history'); // Redirect to /history page
    };

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund pending</div>
                <div className={styles.subtitle}>The refund request is pending action from the customer.</div>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Payment Details</span>
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
                        <div className={styles.row}>
                            <span className={styles.label}>Expected Payment from Customer</span>
                        </div>
                        <div className={styles.row}>
                            <span>SGD 5.30</span>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span>Customer supposed to pay 5.30 so I refund him</span>
                        </div>
                    </div>
                </div>

                <button
                    className={styles.cancelButton}
                    onClick={handleCancel}
                >
                    CANCEL REQUEST
                </button>
            </div>
        </div>
    );
};

export default RefundDetails;
