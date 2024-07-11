import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import HistoryIcon from '@mui/icons-material/History';
import styles from '../../styles/payment/QRPay.module.css';
import { useAuth } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from '../../utils/axiosConfig';

const QRPay = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const paymentAmount = localStorage.getItem('paymentAmount');
    const [isExpired, setIsExpired] = useState(false);
    const [qrData, setQRData] = useState('');
    const [polling, setPolling] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [transactionFound, setTransactionFound] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpired(true);
        }, 30000); // 30 seconds 

        return () => clearTimeout(timer);
    }, []);

    const handleEdit = () => {
            navigate('/payment');
        
    };

    useEffect(() => {
        if (user) {
            const transactionId = uuidv4();
            setTransactionId(transactionId);
            setQRData(
                JSON.stringify({
                    type: "DBSBizQR",
                    amount: paymentAmount,
                    merchant_name: user.name,
                    merchant_id: user.user_id,
                    transaction_id: transactionId
                })
            );
            setPolling(true);
        }
    }, [user, paymentAmount]);

    const fetchTransactions = useCallback(async () => {
        if (user && transactionId) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const transaction = response.data.find(tx => tx.transaction_id === transactionId);
                if (transaction) {
                    setTransactionFound(true)
                    setPolling(false);
                    navigate('/payment/success');
                }
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user, transactionId, navigate]);

    useEffect(() => {
        if (polling) {
            const interval = setInterval(() => {
                fetchTransactions();
            }, 4000); 

            const timeout = setTimeout(() => {
                clearInterval(interval);
            }, 30000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [polling, fetchTransactions]);

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Payment</h2>
            </div>
            <div className={styles.qrContainer}>
                <div className={styles.qrCode}>
                    {isExpired ? (
                        <div>
                            <div style={{ position: 'relative', filter: 'opacity(20%)' }}>
                                <QRCode
                                    style={{ height: "auto", maxWidth: "70vw", width: "70vw" }}
                                    value={qrData} 
                                />
                            </div>
                            <HistoryIcon style={{ height: "auto", maxWidth: "60vw", width: "60vw" }} className={styles.historyIcon} />
                        </div>
                    ) : (
                        <QRCode
                            style={{ height: "auto", maxWidth: "70vw", width: "70vw" }}
                            value={qrData}
                        />
                    )}
                </div>
                <div className={styles.amount}>
                    {isExpired ? "QR Code expired" : `Amount: S$${paymentAmount}`}
                </div>
            </div>
            <div className={styles.footer}>
                <button className={styles.editButton} onClick={handleEdit}>
                    {isExpired ? 'Regenerate' : 'Edit'}
                </button>
                {(transactionFound) ? <p id="qrpay_transactionfound" style={{opacity: 0}}>Received</p> : <></>}
            </div>
        </div>
    );
};

export default QRPay;
