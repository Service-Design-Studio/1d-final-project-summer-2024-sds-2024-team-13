import { useLocation, useNavigate } from 'react-router-dom';
import RefundDetailsNav from './OLDRefundDetailsNav';
import styles from "../../styles/refunds/RefundReview.module.css";
import { useAuth } from '../../context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { v4 as uuidv4 } from 'uuid';
import RefundRejectReason from './RefundRejectReason';
const RefundReview = () => {
    const location = useLocation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { refund } = location.state || {};
    const [reply, setReply] = useState("")


    const [showOverlay, setShowOverlay] = useState(false)

    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };
    const [transaction, setTransaction] = useState({})
    const fetchTransactionDetails = useCallback(async () => {
        if (user && refund?.transaction_id) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions/${refund.transaction_id}`);
                if (response.status === 200) {
                    console.log('Transaction details:', response.data);
                    setTransaction(response.data);
                } else {
                    console.error('Failed to fetch transaction:', response.status);
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        }
    }, [user, refund?.transaction_id]);
    useEffect(() => {
        fetchTransactionDetails();
    }, [fetchTransactionDetails]);
    const createTransaction = useCallback(async () => {
        if (user) {
            const endpoint = `/users/${user.user_id}/transactions`;
            try {
                const response = await axiosInstance.post(endpoint,
                    {
                        customer_id: refund.customer_id,
                        customer_number: "12345678", //TODO: to change
                        payment_method: "PayLah",
                        amount: refund.refund_amount,
                        transaction_id: uuidv4(),
                        status: "REFUNDED"
                    }
                );
                if (response.status === 201) {
                    console.log('Transaction created successfully:', response.data);
                    return response.data;  // Return the created transaction data or true to indicate success
                } else {
                    console.error('Failed to create transaction:', response.status, response.data);
                    return null;  // Return null or false to indicate failure
                }
            } catch (error) {
                console.error('Error creating transaction:', error);
                return null;
            }
        }
        return null;  // Return null if user is not defined
    }, [user, refund.customer_id, refund.refund_amount]);
    const patchRefundRequest = useCallback(async (newStatus) => {
        if (user) {
            const endpoint = `/users/${user.user_id}/transactions/${refund.transaction_id}/refund_request`;
            const requestBody = {
                status: newStatus,
                id: refund.refund_request_id,
                response_reason: "",

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
    const declineRefundRequest = useCallback(async (reply) => {
        if (user && reply!=="") {
            const endpoint = `/users/${user.user_id}/transactions/${refund.transaction_id}/refund_request`;
            const requestBody = {
                status: "REJECTED",
                id: refund.refund_request_id,
                response_reason: reply,
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
        setShowOverlay(true);

    };

    const handleAccept = () => {
        patchRefundRequest("APPROVED");
        createTransaction();
    };

    return (
        <div className={styles.screen} data-testid="refund-review-screen">
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title} data-testid="refund-requested-title">Refund Requested</div>
                <div className={styles.subtitle} data-testid="refund-requested-subtitle">The refund request is pending action <br></br>from you.</div>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle} data-testid="refund-details-title">Refund Details</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label} data-testid="customer-will-receive-label"> Customer will receive</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount} data-testid="customer-will-receive-amount">SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label} data-testid="to-be-paid-to-label">To be paid to</span>
                        <span data-testid="to-be-paid-to-value"><b>{transaction?.customer_number}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label} data-testid="to-be-paid-by-label">To be paid by</span>
                        <span data-testid="to-be-paid-by-value"><b>{transaction?.user_name}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label} data-testid="last-updated-label">Last updated</span>
                        <span data-testid="last-updated-value"><b>{formatDate(refund.updated_at)}, {formatTimestamp(refund.updated_at)}</b></span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label} data-testid="expected-payment-label">Expected Payment from Customer</span>
                        </div>
                        <div className={styles.row}>
                            <span data-testid="expected-payment-amount">SGD {parseFloat(refund.expect_amount).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label} data-testid="refund-reason-label">Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span data-testid="refund-reason-value">{(refund.request_reason !== "" && refund.request_reason) ? refund.request_reason : "N.A"}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row} >
                        <span className={styles.label} data-testid="original-payment-label">Original Payment</span>
                        <span data-testid="original-payment-amount"><b>SGD {parseFloat(transaction?.amount).toFixed(2)}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel} data-testid="original-payment-date-label">Date and Time</span>
                        <span className={styles.smallValue} data-testid="original-payment-date-value">{formatDate(transaction?.created_at)}, {formatTimestamp(transaction?.created_at)}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel} data-testid="transaction-id-label">Transaction ID</span>
                        <span className={styles.smallID} data-testid="transaction-id-value">{refund.transaction_id}</span>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button
                        className={styles.decline}
                        onClick={handleDecline}
                        data-testid="decline-button"
                    >
                        DECLINE
                    </button>
                    <button
                        className={styles.accept}
                        onClick={handleAccept}
                        data-testid="accept-button"
                    >
                        ACCEPT
                    </button>
                </div>

            </div>
            <RefundRejectReason {...{refund, transaction, formatDate, formatTimestamp, showOverlay, setShowOverlay, declineRefundRequest, reply, setReply}}/>
        </div>
    );
};

export default RefundReview;