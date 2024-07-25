import { useLocation, useNavigate } from 'react-router-dom'; 
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundReview.module.css";
import { useAuth } from '../../context/AuthContext';
import { useCallback } from 'react';
import axiosInstance from '../../utils/axiosConfig';

const RefundReview = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate(); 
    const { refund } = location.state || {};
    const patchRefundRequest = useCallback(async (newStatus) => {
        if (user) {
            const endpoint = `/users/${user.user_id}/transactions/${refund.transaction_id}/refund_request`;
            const requestBody = {
                refund_request_id: refund.refund_request_id,
                status: newStatus
            };

            try {
                const response = await axiosInstance.patch(endpoint, requestBody);
                if (response.status === 200) {
                    console.log('Refund request updated successfully:', response.data);
                    navigate("/refunds"); 
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Failed to update refund request:', error);
            }
        }
    }, [user, navigate, refund.refund_request_id, refund.transaction_id]);

    const handleDecline = () => {
        patchRefundRequest("REJECTED");

    };

    const handleAccept = () => {
        patchRefundRequest("APPROVED");
    };

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund Requested</div>
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
                        <span className={styles.amount}>SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>To be paid to</span>
                        <span><b>12345678</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>To be paid by</span>
                        <span><b>{user.name}</b></span>
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
                            <span>SGD {parseFloat(refund.expect_amount).toFixed(2)}</span>
                        </div>
                    </div> 
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span>NIL</span>
                        </div>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span><b>SGD{parseFloat(parseFloat(refund.expect_amount)+parseFloat(refund.refund_amount)).toFixed(2)}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Date and Time</span>
                        <span className={styles.smallValue}>14 Jul 2024, 02:34:19 PM</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Transaction ID</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span className={styles.smallValue}>{refund.transaction_id}</span>
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