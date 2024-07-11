import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../styles/payment/PaymentSuccess.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";
import { useAuth } from '../../context/AuthContext';

const PaymentSuccess = ({ transaction }) => {
    const { logout } = useAuth();
    const location = useLocation();
    const { paymentInfo } = location.state || {};
    const navigate = useNavigate();

    const handleNewPayment = () => {
        navigate('/payment');
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Payment</h2>
            </div>
            <div className={styles.successContainer}>
                <CheckCircleIcon style={{ height: "auto", maxWidth: "30vw", width: "30vw" }} className={styles.successIcon} />
                <div className={styles.statusText}>You paid</div>
                <div className={styles.amount}>SGD {(paymentInfo) ? parseFloat(paymentInfo.amount).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                <div className={styles.date}>{new Date().toLocaleString()}</div>
                <div className={styles.transactionID}>{(paymentInfo) ? paymentInfo.transaction_id : ""}</div>
                <img 
                    className={styles.paymentLogo} 
                    src={transaction && transaction.payment_method === "Paynow" ? paynowIcon : paylahIcon} 
                    alt="Payment Method Logo" 
                />
            </div>
            <div className={styles.footer}>
                <button className={styles.newButton} onClick={handleNewPayment}>
                    Make a new payment
                </button>
                <button className={styles.logoutButton} onClick={()=>logout()}>Log Out</button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
