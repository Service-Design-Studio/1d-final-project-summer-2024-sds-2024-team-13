import { useLocation, useNavigate } from 'react-router-dom';
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundDetails.module.css";
import { ErrorOutline } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const RefundDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { refund } = location.state || {};
    const [transaction, setTransaction] = useState({})
    const { customer } = useAuth();
    const fetchTransactionDetails = useCallback(async () => {
        if (refund?.transaction_id) {
            try {
                const response = await axiosInstance.get(`/users/${refund.user_id}/transactions/${refund.transaction_id}`);
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
    }, [refund?.transaction_id, refund.user_id]);

    useEffect(() => {
        fetchTransactionDetails();
    }, [fetchTransactionDetails]);

    const deleteRefundRequest = useCallback(async () => {
        if (customer && refund?.transaction_id && refund?.refund_request_id) {
            const endpoint = `/customers/${customer.customer_id}/transactions/${refund?.transaction_id}/refund_request`;
            const response = await axiosInstance.delete(endpoint, {
                data: { refund_request_id: refund?.refund_request_id }
            });

            if (response.status === 200) {
                navigate('/refunds');
                return response.data;
            } else {
                return null;
            }
        }
        return null;
    }, [refund?.refund_request_id, refund?.transaction_id, customer, navigate]);

    const handleCancel = () => {
        deleteRefundRequest();
    };
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

    const status = refund?.status
    return (
        <div className={styles.screen} data-testid="refund-details-view">
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund {status}</div>

                {(status === "pending") ? <div className={styles.subtitle}>
                    The refund request is pending action from <br></br>the merchant.
                </div> :
                    (status === "APPROVED") ? <div className={styles.subtitle}>
                        The refund has been approved and processed <br></br>to you.
                    </div> :
                        (status === "REJECTED") ? <div className={styles.subtitle}>
                            The refund request has been rejected by <br></br>the merchant.
                        </div> : <></>}

                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Refund Details</span>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            You will receive
                        </span> :
                            (status === "APPROVED") ? <span className={styles.label}>
                                You received
                            </span> : <></>}
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount} data-testid="refund-amount">SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            To be paid to
                        </span> :
                            (status === "APPROVED") ? <span className={styles.label}>
                                Paid to
                            </span> : <></>}
                        <span data-testid="refund-customer-mobile"><b>{transaction?.customer_number}</b></span>
                    </div>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            To be paid by
                        </span> :
                            (status === "APPROVED") ? <span className={styles.label}>
                                Paid by
                            </span> : <></>}
                        <span data-testid="refund-hawker"><b>{transaction?.user_name}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Last updated</span>
                        <span data-testid="refund-timestamp"><b>{formatDate(refund?.updated_at)}, {formatTimestamp(refund?.updated_at)}</b></span>
                    </div>
                </div>


                {(status === "pending" || status === "APPROVED") ? <div className={styles.fullWidthSection}>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Expected Payment from You</span>
                        </div>
                        <div className={styles.row}>
                            <span data-testid="refund-expected-payment">SGD {parseFloat(refund.expect_amount).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span data-testid="refund-reasons">{(refund.request_reason !== "" && refund.request_reason) ? refund.request_reason : "N.A"}</span>
                        </div>
                    </div>
                </div> : null}
                {(status === "REJECTED") ?
                    <div className={styles.fullWidthSection}>
                        <div className={styles.row}>
                            <span className={styles.label}>Merchant's response</span>
                        </div>
                        <div className={styles.row}>
                            <span>{refund.response_reason}</span>
                        </div>
                    </div> : null}
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span data-testid="refund-amount-to-be-refunded"><b>SGD {parseFloat(transaction?.amount).toFixed(2)}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Date and Time</span>
                        <span className={styles.smallValue}>{formatDate(transaction?.created_at)}, {formatTimestamp(transaction?.created_at)}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Transaction ID</span>
                        <span className={styles.smallID} data-testid="refund-transaction-id">{transaction?.transaction_id}</span>
                    </div>
                </div>

                {status === "REJECTED" ? (
                    <div className={styles.redRow}>
                        <ErrorOutline className={styles.redIcon} />
                        <span className={styles.redLabel}>
                            Please make an attempt to contact the merchant to verify transaction details.
                        </span>
                    </div>
                ) : <></>}

                {(status === "pending") ? <button
                    className={styles.Button}
                    onClick={handleCancel}
                >
                    CANCEL REQUEST
                </button> : <></>}

            </div>
        </div>
    );
};

export default RefundDetails;
