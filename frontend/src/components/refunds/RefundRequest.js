import { useCallback, useState } from 'react';
import RefundRequestNav from './RefundRequestNav';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ErrorOutline } from '@mui/icons-material';
import styles from "../../styles/refunds/RefundRequest.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';
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
                    navigate("/refunds")
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Failed to create refund request:', error);
            }
        }
    }, [user]);
    
    const handleSubmit = () => {
        setIsSubmitted(true);
        createRefundRequest();
    };

    const isButtonDisabled = expectedPayment === "" || expectedRefund === "" || expectedPayment === "0.00" || expectedRefund === "0.00" || hasError;

    return (
        <div className={styles.screen}>
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
                        <span className={styles.amount}>SGD {parseFloat(transaction.amount).toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid to</span>
                        <span><b>{transaction.user_name}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid by</span>
                        <span><b>{transaction.customer_number}</b></span>
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
                        <span><b>{transaction.transaction_id}</b></span>
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
                        />
                        <div className={styles.charCount}>{reason.length}/250</div>
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
                        <span>SUBMITTING...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RefundRequest;
