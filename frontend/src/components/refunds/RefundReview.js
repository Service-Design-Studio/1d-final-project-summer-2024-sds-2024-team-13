import { useNavigate } from 'react-router-dom'; 
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundReview.module.css";

const RefundReview = () => {
    const navigate = useNavigate(); 

    const handleDecline = () => {
        navigate(-1); 
    };

    const handleAccept = () => {
        navigate('/history'); 
    };

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund Pending</div>
                <div className={styles.subtitle}>The refund request is pending action <br></br>from you.</div>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Refund Details</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Customer will receive</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD 32.40</span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>To be paid to</span>
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>To be paid by</span>
                        <span><b>Lai Lai Wanton Mee</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Last updated</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>18 Jul 2024, 14:51:52 AM</b></span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Expected Payment from Customer</span>
                        </div>
                        <div className={styles.row}>
                            <span>SGD 3.60</span>
                        </div>
                    </div> 
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span>amount is supposed to be 3.60</span>
                        </div>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span><b>SGD 36.00</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Date and Time</span>
                        <span className={styles.smallValue}>14 Jul 2024, 02:34:19 PM</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Transaction ID</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span className={styles.smallValue}>PAYLAH798329781223872</span>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button
                        className={styles.decline}
                        onClick={handleDecline}
                    >
                        DECLINE
                    </button>
                    <button
                        className={styles.accept}
                        onClick={handleAccept}
                    >
                        ACCEPT
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RefundReview;