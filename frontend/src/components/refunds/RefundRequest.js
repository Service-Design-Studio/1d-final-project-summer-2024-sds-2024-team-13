import { useCallback, useState } from 'react';
import RefundRequestNav from './RefundRequestNav';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ErrorOutline } from '@mui/icons-material';
import styles from "../../styles/refunds/RefundRequest.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';
import { v4 as uuidv4 } from 'uuid';

const RefundRequest = () => {
    const location = useLocation();
    const { transaction } = location.state || {};
    const [reason, setReason] = useState("");
    const [expectedPayment, setExpectedPayment] = useState("");
    const [expectedRefund, setExpectedRefund] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleReasonChange = (e) => {
        if (e.target.value.length <= 250) {
            setReason(e.target.value);
        }
    };

    const handleExpectedPaymentChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for the dot
        if (!isNaN(value) && value.match(/^(\d+(\.\d{0,2})?)?$/)) { // Allow only valid numbers with up to 2 decimal places
            setExpectedPayment(value);
            if (value === "") {
                setExpectedRefund("");
                setHasError(false);
            } else {
                const payment = parseFloat(value) || 0;
                const refund = (parseFloat(transaction.amount).toFixed(2) - payment).toFixed(2);
                setExpectedRefund(refund >= 0 ? refund : "");
                setHasError(payment > parseFloat(transaction.amount).toFixed(2));
            }
        }
    };

    const handleExpectedRefundChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except for the dot
        if (!isNaN(value) && value.match(/^(\d+(\.\d{0,2})?)?$/)) { // Allow only valid numbers with up to 2 decimal places
            setExpectedRefund(value);
            if (value === "") {
                setExpectedPayment("");
                setHasError(false);
            } else {
                const refund = parseFloat(value) || 0;
                const payment = (parseFloat(transaction.amount).toFixed(2) - refund).toFixed(2);
                setExpectedPayment(payment >= 0 ? payment : "");
                setHasError(refund > parseFloat(transaction.amount).toFixed(2));
            }
        }
    };

    const handleBlur = (field) => {
        if (field === "payment") {
            if (expectedPayment === "") {
                setExpectedPayment("");
                setExpectedRefund("");
            } else {
                setExpectedPayment(parseFloat(expectedPayment).toFixed(2));
            }
        }
        if (field === "refund") {
            if (expectedRefund === "") {
                setExpectedRefund("");
                setExpectedPayment("");
            } else {
                setExpectedRefund(parseFloat(expectedRefund).toFixed(2));
            }
        }
    };

    const createTransaction = useCallback(async () => {
        if (user) {
            const endpoint = `/users/${user.user_id}/transactions`;
            try {
                const response = await axiosInstance.post(endpoint, 
                    {
                        customer_id: transaction.customer_id,
                        customer_number: transaction.customer_number,
                        payment_method: transaction.payment_method,
                        amount: expectedRefund,
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
    }, [user, expectedRefund, transaction.customer_id, transaction.customer_number, transaction.payment_method]);

    // SEND FROM HAWKER TO CUSTOMER
    const createRefundRequest = useCallback(async () => {
        if (user) {
            try {
                const requestBody = {
                    refund_request: {
                        transaction_id: transaction?.transaction_id ?? "",
                        status: "APPROVED",
                        expect_amount: expectedPayment,
                        refund_amount: expectedRefund,
                        recipient_id: transaction?.customer_id ?? "",
                        recipient_type: "Customer"
                    }
                };
    
                const response = await axiosInstance.post(`/users/${user.user_id}/transactions/${transaction.transaction_id}/refund_request`, requestBody);
    
                if (response.status === 201) {
                    console.log('Refund request created successfully:', response.data);
                    createTransaction();
                    navigate("/refunds")
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Failed to create refund request:', error);
            }
        }
    }, [ user, 
        expectedPayment, 
        expectedRefund, 
        transaction?.transaction_id, 
        transaction?.customer_id, 
        navigate,
    createTransaction]);
    
    const handleSubmit = () => {
        setIsSubmitted(true);
        createRefundRequest();
    };

    const isButtonDisabled = expectedPayment === "" || expectedRefund === "" || expectedPayment === "0.00" || expectedRefund === "0.00" || hasError;

    return (
        <div className={styles.screen} data-testid="refund-request-page">
            <RefundRequestNav />
            <div className={styles.content}>
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Payment Details</span>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Customer paid</span>
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount} data-testid="refund-amount">SGD {parseFloat(transaction.amount).toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid to</span>
                        <span><b data-testid="refund-hawker">{transaction.user_name}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid by</span>
                        <span><b data-testid="refund-customer-mobile">{transaction.customer_number}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Date and Time</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b data-testid="refund-timestamp">17 Jul 2024, 09:41:21 AM</b></span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b data-testid="refund-transaction-id">{transaction.transaction_id}</b></span>
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
                                onBlur={() => handleBlur("payment")}
                            />
                            {hasError && parseFloat(expectedPayment) > parseFloat(transaction.amount).toFixed(2) && (
                                <ErrorOutline className={styles.errorIcon} />
                            )}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Amount to be Refunded</div>
                        <div className={styles.inputWrapper}>
                            <span className={styles.prefix}>S$</span>
                            <input 
                                type="text" 
                                placeholder="0.00" 
                                className={styles.input} 
                                value={expectedRefund}
                                onChange={handleExpectedRefundChange}
                                onBlur={() => handleBlur("refund")}
                            />
                            {hasError && parseFloat(expectedRefund) > parseFloat(transaction.amount).toFixed(2) && (
                                <ErrorOutline className={styles.errorIcon} />
                            )}
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
                            data-testid="refund-reasons"
                        />
                        <div className={styles.charCount}>{reason.length}/250</div>
                    </div>
                </div>
                {!isSubmitted ? (
                    <button
                        className={`${styles.submitButton} ${isButtonDisabled ? styles.disabledButton : ''}`}
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                        data-testid="refund-submit-button"
                    >
                        SUBMIT
                    </button>
                ) : (
                    <div className={styles.submittedMessage} data-testid="refund-submitted">
                        <CheckCircleIcon className={styles.successIcon} />
                        <span>SUBMITTING...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RefundRequest;
