import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from '../../styles/payment/PaymentReview.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';
import TopHead from '../TopHead';

const PaymentReview = ({ transaction }) => {
    const { customer } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};
    const paymentMethod = transaction && transaction.payment_method === "Paynow" ? "PayNow" : "PayLah";

    const handleBack = () => {
        navigate('/payment');
    };

    const handleConfirm = () => {
        createTransaction();
    };

    const [paymentInfo, setPaymentInfo] = useState({
        type: "",
        merchant_id: "",
        merchant_name: "",
        amount: "0",
        transaction_id: "",
        receipt: "" // Add receipt to the payment info state
    });

    useEffect(() => {
        if (data) {
            setPaymentInfo(data);
        } else {
            // Use a sample receipt for testing and debugging purposes
            setPaymentInfo({
                type: "Sample",
                merchant_id: "12345",
                merchant_name: "Sample Merchant",
                amount: "23.50",
                transaction_id: "sample-transaction-id",
                receipt: `
Receipt
--------------------------
Item Name      Quantity      Price
--------------------------
Sliced Fish Soup + Rice   1      5.50
Sliced Fish You Mee       1      5.00
Pork You Mee              1      4.50
--------------------------
Total Amount: S$23.50
--------------------------
`
            });
        }
    }, [data]);

    const createTransaction = async () => {
        const body = {
            customer_id: customer.customer_id,
            customer_number: customer.phone_num,
            payment_method: paymentMethod,
            amount: paymentInfo.amount,
            transaction_id: paymentInfo.transaction_id,
            status: "nil",
            items: paymentInfo.receipt
        };

        try {
            const response = await axiosInstance.post(`users/${paymentInfo.merchant_id}/transactions`, body);
            console.log('Transaction successful:', response.data);
            navigate("/payment/success", { state: { paymentInfo } });
        } catch (error) {
            console.error('Error creating transaction:', error);
            return false;
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <ArrowBackIosNewIcon className={styles.backIcon} onClick={handleBack} />
                <TopHead title="Payment" />
            </div>
            <div className={styles.reviewContainer}>
                <div className={styles.statusText}>Merchant gets</div>
                <div className={styles.amount}>SGD {parseFloat(paymentInfo.amount).toFixed(2)}</div>
                <img
                    className={styles.paymentLogo}
                    src={paymentMethod === "PayNow" ? paynowIcon : paylahIcon}
                    alt="Payment Method Logo" />
                <div className={styles.details}>From {(customer) ? customer.name : "Loading..."}</div>
                <div className={styles.recipientDetails}>To {paymentInfo.merchant_name}</div>
                <div className={styles.paymentMethod}>{paymentMethod} QR</div>
                <div className={styles.receiptContainer} style={{textAlign: "left"}}>
                    <pre className={styles.receipt}>{paymentInfo.receipt}</pre>
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.confirmButton} onClick={handleConfirm}>
                    LET'S GO
                </button>
            </div>
        </div>
    );
};

export default PaymentReview;
