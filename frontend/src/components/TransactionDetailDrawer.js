import styles from "../styles/transactionDetail.module.css"
import { SwipeableDrawer } from '@mui/material';
import paylahIcon from "../assets/paylahIcon.svg"
import paynowIcon from "../assets/paynowIcon.svg"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TransactionDetailDrawer = ({
    toggleDrawer,
    isOpen,
    transaction
}) => {
    const navigate = useNavigate();
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    const [displayedTransaction, setDisplayedTransaction] = useState({
        amount: 0,
        created_at: new Date(),
        payment_method: "Loading...",
        id: "Loading..."

    })

    useEffect(() => {
        if (transaction != null) {
            setDisplayedTransaction(transaction)
        }
    }, [transaction])
    

    return (
        <SwipeableDrawer
            className={styles.main}
            anchor="bottom"
            open={isOpen}
            onClose={(event) => {
                toggleDrawer(false)(event);
            }}
            onOpen={(event) => {
                toggleDrawer(true)(event);
            }}
            data-testid="transaction-details-popup"
        >
            <div className={styles.content}>
                <div className={styles.swipeBar}></div>
                <div className={styles.top}>
                    <>
                        {(displayedTransaction.payment_method === "Paylah") ? <img src={paylahIcon} alt="" /> : <></>}
                        {(displayedTransaction.payment_method === "Paynow") ? <img src={paynowIcon} alt="" /> : <></>}

                    </>
                    <h3>Customer Paid:</h3>
                    <h1 className={styles.amount} data-testid="transaction-amount">SGD<span>{parseFloat(displayedTransaction.amount).toFixed(2)}</span></h1>
                    <h4 className={styles.timestamp} data-testid="transaction-timestamp">{formatDate(displayedTransaction.created_at)} • {formatTimestamp(displayedTransaction.created_at)}</h4>
                </div>
                <div className={styles.bottom}>
                    <p className={styles.label}>Payment Method</p>
                    <p className={styles.property} data-testid="transaction-payment-source">{displayedTransaction.payment_method}</p>
                    <p className={styles.label}>Transaction ID</p>
                    <p className={styles.property} data-testid="transaction-id">{displayedTransaction.transaction_id}</p>
                    <p className={styles.label}>Customer Mobile</p>
                    <p className={styles.property} data-testid="transaction-customer-mobile">{transaction.customer_number}</p>
                    {(transaction.status !== "pending" && transaction.status !== "APPROVED" && transaction.status !== "REJECTED" && transaction.status !== "REFUNDED") ? <button onClick={()=>navigate("/refunds/request", { state: { transaction: transaction } })} className={styles.refundButton} data-testid="refund-customer-button">Refund Customer</button> : <></>}
                    {(transaction.status === "pending") ? <button onClick={()=>navigate("/refunds/")} className={styles.refundButton}>Review Refund Request</button> : <></>}
                </div>
            </div>
        </SwipeableDrawer>
    );
}
export default TransactionDetailDrawer;