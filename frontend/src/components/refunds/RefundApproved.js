import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundApproved.module.css";

const RefundApproved = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCancel = () => {
        navigate('/history'); // Redirect to /history page
    };

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund Approved</div>
                <div className={styles.subtitle}>The refund has been approved and processed to the customer.</div>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Payment Details</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Customer received</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD 524.70</span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid to</span>
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid by</span>
                        <span><b>Lai Lai Wanton Mee</b></span>
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
                        <span><b>REPAYLAH18296309271973212</b></span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Reason(s) for refund</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>customer supposed to pay 5.30 so i refund him</b></span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.header}>Original Payment</span>
                        <span className={styles.header}>SGD 530.00</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallHeader}><b>Date and Time</b></span>
                        <span className={styles.smallHeader}>17 JUL 24, 09:41 AM</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallHeader}><b>Transaction ID</b></span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span className={styles.smallHeader}>PAYLAH18296309271973212</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundApproved;
