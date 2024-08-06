import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from '../../styles/payment/PaymentSuccess.module.css';
import paynowIcon from "../../assets/paynowIcon.svg";
import paylahIcon from "../../assets/paylahIcon.svg";
import LinearProgress from '@mui/material/LinearProgress';
import TopHead from '../TopHead';

const PaymentSuccess = ({ transaction }) => {
    const navigate = useNavigate();
    const paymentAmount = localStorage.getItem('paymentAmount');
    const [counter, setCounter] = useState(7);
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const start = Date.now();
        const countdownDuration = 7000; // 7 seconds

        const intervalId = setInterval(() => {
            const elapsed = Date.now() - start;
            const remainingTime = Math.max(0, countdownDuration - elapsed);
            const newCounter = Math.ceil(remainingTime / 1000);
            setCounter(newCounter);
            setProgress((elapsed / countdownDuration) * 100);

            if (remainingTime <= 0) {
                clearInterval(intervalId);
                navigate('/home');
            }
        }, 100); // Update every 100ms for smooth progress

        return () => {
            clearInterval(intervalId);
        };
    }, [navigate]);
    const handleNewPayment = () => {
        navigate('/payment');
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <TopHead title="Payment" />
            </div>
            <div className={styles.footer}>
                <div className={styles.successContainer}>
                    <CheckCircleIcon style={{ height: "auto", maxWidth: "30vw", width: "30vw" }} className={styles.successIcon} data-testid="success-animation" />
                    <div className={styles.statusText}>Customer paid</div>
                    <div className={styles.amount}>SGD {paymentAmount}</div>
                    <div className={styles.date}>{(transaction) ? transaction.created_at.toLocaleString() : "-"}</div>
                    <img
                        className={styles.paymentLogo}
                        src={transaction && transaction.payment_method === "Paynow" ? paynowIcon : paylahIcon}
                        alt="Payment Method Logo"
                    />
                </div>
                <button className={styles.newButton} onClick={handleNewPayment}>
                    New
                </button>
                <div className={styles.redirect}>
                    <p>Redirecting you back to home in {counter}s</p>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: '7px',
                            width: '90vw',
                            borderRadius: "8px",
                            backgroundColor: '#FB7C93',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#fff',
                            },
                        }}
                    />   
                </div>         
            </div>
        </div>
    );
};

export default PaymentSuccess;
