import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../styles/payment/PaymentSuccess.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";

const PaymentSuccess = ({ transaction }) => {
    const navigate = useNavigate();
    const paymentAmount = localStorage.getItem('paymentAmount');

    const handleNewPayment = () => {
        navigate('/payment');
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Payment</h2>
            </div>
            <div className={styles.successContainer}>
                <CheckCircleIcon className={styles.successIcon} />
                <div className={styles.statusText}>Customer paid</div>
                <div className={styles.amount}>SGD {paymentAmount}</div>
                <div className={styles.date}>{new Date().toLocaleString()}</div>
                <img 
                    className={styles.paymentLogo} 
                    src={transaction && transaction.payment_method === "Paynow" ? paynowIcon : paylahIcon} 
                    alt="Payment Method Logo" 
                />
            </div>
            <div className={styles.footer}>
                <button className={styles.newButton} onClick={handleNewPayment}>
                    New
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
