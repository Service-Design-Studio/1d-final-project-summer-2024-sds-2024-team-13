import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import styles from '../../styles/payment/PaymentReview.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";

const PaymentReview = ({ transaction }) => {
    const navigate = useNavigate();
    const paymentAmount = localStorage.getItem('paymentAmount') || "0.00";
    const phoneNumber = localStorage.getItem('phoneNumber') || "8XXX XXXX";
    const paymentMethod = transaction && transaction.payment_method === "Paynow" ? "PayNow" : "PayLah";
    const recipient = transaction ? transaction.recipient : "Unknown Recipient";
    const transactionNumber = transaction ? transaction.transactionNumber : "NA";

    const handleBack = () => {
        navigate('/payment');
    };

    const handleConfirm = () => {
        navigate('/payment/success');
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <ArrowBackIosNewIcon className={styles.backIcon} onClick={handleBack} />
                <h2 className={styles.headerText}>Review</h2>
            </div>
            <div className={styles.reviewContainer}>
                <div className={styles.statusText}>Recipient gets</div>
                <div className={styles.amount}>SGD {paymentAmount}</div>
                <img
                    className={styles.paymentLogo}
                    src={transaction && transaction.payment_method === "Paynow" ? paynowIcon : paylahIcon}
                    alt="Payment Method Logo" />
                <div className={styles.details}>From {phoneNumber}</div>
                <div className={styles.recipientDetails}>To {recipient}</div>
                <div className={styles.paymentMethod}>{paymentMethod} QR</div>
                <div className={styles.transactionLabel}>{transactionNumber}</div>
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

