import { useLocation } from 'react-router-dom';
import TopNav from '../TopNav';
import styles from "../../styles/refunds/RefundDetails.module.css";
import { useAuth } from '../../context/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';

const RefundDetails = () => {
    const location = useLocation();
    const { refund } = location.state || {};
    const { user } = useAuth();
    const [transaction, setTransaction] = useState({});

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

    const addDays = (dateString, days) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date;
    };

    const autoRejectionDate = refund ? addDays(refund.created_at, 7) : null;
    const formattedAutoRejectionDate = autoRejectionDate ? `${formatDate(autoRejectionDate)}, ${formatTimestamp(autoRejectionDate)}` : '';


    return (
        <div className={styles.screen} data-testid="refund-details-view">
            <TopNav
                title="Refund Details"
                pathname={-1}
                hasBackButton="yes"
            />
            <div className={styles.content}>
                {refund ? (
                    <>
                        <div className={styles.title}>Refund {refund.status}</div>

                        {refund.status === "pending" ? (
                            <div className={styles.subtitle}>
                                The refund request is pending action from you.<br/>
                    <p className={styles.warning}>This request will be automatically rejected on {formattedAutoRejectionDate} if no action is taken by you.</p>
                            </div>
                        ) : refund.status === "APPROVED" ? (
                            <div className={styles.subtitle}>
                                The refund has been approved and processed to the customer.
                            </div>
                        ) : refund.status === "REJECTED" ? (
                            <div className={styles.subtitle}>
                                The refund request has been rejected by you.
                            </div>
                        ) : null}

                        <div className={styles.sectionTitle}>
                            <span className={styles.paymentTitle}>Refund Details</span>
                        </div>

                        <div className={styles.fullWidthSection}>
                            <div className={styles.row}>
                                {(refund.status === "pending" || refund.status === "REJECTED") ? (
                                    <span className={styles.label}>Customer will receive</span>
                                ) : refund.status === "APPROVED" ? (
                                    <span className={styles.label}>Customer received</span>
                                ) : null}
                            </div>
                            <div className={styles.row}>
                                <span></span>
                                <span className={styles.amount}>SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className={styles.fullWidthSection}>
                            <div className={styles.row}>
                                {(refund.status === "pending" || refund.status === "REJECTED") ? (
                                    <span className={styles.label}>To be paid to</span>
                                ) : refund.status === "APPROVED" ? (
                                    <span className={styles.label}>Paid to</span>
                                ) : null}
                                <span data-testid="refund-customer-mobile"><b>{transaction?.customer_number ?? "-"}</b></span>
                            </div>
                            <div className={styles.row}>
                                {(refund.status === "pending" || refund.status === "REJECTED") ? (
                                    <span className={styles.label}>To be paid by</span>
                                ) : refund.status === "APPROVED" ? (
                                    <span className={styles.label}>Paid by</span>
                                ) : null}
                                <span data-testid="refund-hawker"><b>{transaction.user_name}</b></span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.label}>Last updated</span>
                                <span data-testid="refund-timestamp"><b>{formatDate(refund?.updated_at)}, {formatTimestamp(refund?.updated_at)}</b></span>
                            </div>
                        </div>

                        {["pending", "APPROVED"].includes(refund.status) && (
                            <>
                                <div className={styles.section}>
                                    <div className={styles.row}>
                                        <span className={styles.label}>Expected Payment from Customer</span>
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
                                        <span data-testid="refund-reasons">{refund.request_reason ? refund.request_reason : "N.A"}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {refund.status === "REJECTED" && (
                            <div className={styles.section}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Customer Reason(s) for Refund</span>
                                </div>
                                <div className={styles.row}>
                                    <span>{refund.request_reason ? refund.request_reason : "N.A"}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Your response:</span>
                                </div>
                                <div className={styles.row}>
                                    <span>{refund.response_reason ? refund.response_reason : "N.A"}</span>
                                </div>
                            </div>
                        )}

                        <div className={styles.fullWidthSection}>
                            <div className={styles.row}>
                                <span className={styles.label}>Original Payment</span>
                                <span data-testid="transaction-amount"><b>SGD {parseFloat(transaction?.amount).toFixed(2)}</b></span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.smallLabel}>Date and Time</span>
                                <span className={styles.smallValue}>{formatDate(transaction?.created_at)}, {formatTimestamp(transaction?.created_at)}</span>
                            </div>
                            <div className={styles.row}>
                                <span className={styles.smallLabel}>Transaction ID</span>
                                <span className={styles.smallID} data-testid="transaction-id">{transaction?.transaction_id ?? ""}</span>
                            </div>
                        </div>
                        <div className={styles.fullWidthTransparent}>
                            <div className={styles.row}>
                                <span className={styles.label}><b>Refund ID</b></span>
                            </div>
                            <div className={styles.row}>
                                <span><b>{refund.refund_request_id}</b></span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.error}>Refund details not available</div>
                )}
            </div>
        </div>
    );
};

export default RefundDetails;
