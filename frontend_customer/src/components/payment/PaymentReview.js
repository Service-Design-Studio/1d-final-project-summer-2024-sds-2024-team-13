import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from '../../styles/payment/PaymentReview.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';

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
        transaction_id: ""
    })

    useEffect(()=> {
        if (data) {
            setPaymentInfo(data)
        }
    }, [data])

    const createTransaction = async () => {
        const body = {
            customer_id: customer.customer_id,
            customer_number: customer.phone_num,
            payment_method: paymentMethod,
            amount: paymentInfo.amount,
            transaction_id: paymentInfo.transaction_id
        };

        try {
            const response = await axiosInstance.post(`users/${paymentInfo.merchant_id}/transactions`, body);
            console.log('Transaction successful:', response.data);
            navigate("/payment/success", { state: { paymentInfo } })
        } catch (error) {
            console.error('Error creating transaction:', error);
            return false;
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <ArrowBackIosNewIcon className={styles.backIcon} onClick={handleBack} />
                <h2 className={styles.headerText}>Review</h2>
            </div>
            <div className={styles.reviewContainer}>
                <div className={styles.statusText}>Recipient gets</div>
                <div className={styles.amount}>SGD {parseFloat(paymentInfo.amount).toFixed(2)}</div>
                <img
                    className={styles.paymentLogo}
                    src={transaction && transaction.payment_method === "Paynow" ? paynowIcon : paylahIcon}
                    alt="Payment Method Logo" />
                <div className={styles.details}>From {(customer) ? customer.name: "Loading..."}</div>
                <div className={styles.recipientDetails}>To {paymentInfo.merchant_name}</div>
                <div className={styles.paymentMethod}>{paymentMethod} QR</div>
                
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

