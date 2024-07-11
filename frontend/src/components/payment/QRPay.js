import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import HistoryIcon from '@mui/icons-material/History';
import styles from '../../styles/payment/QRPay.module.css';
import { useAuth } from '../../context/AuthContext';

const QRPay = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const paymentAmount = localStorage.getItem('paymentAmount');
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpired(true);
        }, 10000); // 10 seconds for testing

        return () => clearTimeout(timer);
    }, []);

    const handleEdit = () => {
        if (isExpired) {
            navigate('/payment');
        } else {
            navigate('/payment/success');
        }
    };

    const [qrData, setQRData] = useState(JSON.stringify({
        type: "DBSBizQR",
        amount: paymentAmount,
        merchant_name: "",
        merchant_id: ""
    }))

    useEffect(() => {
        if (user) {
            setQRData(
                JSON.stringify({
                    type: "DBSBizQR",
                    amount: paymentAmount,
                    merchant_name: user.name,
                    merchant_id: user.user_id
                })
            )
        }
    }, [user, paymentAmount])

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
            </div>
        </div>
    );
};

export default QRPay;
