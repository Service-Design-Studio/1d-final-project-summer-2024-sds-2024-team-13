import { SwipeableDrawer } from "@mui/material";
import styles from "../../styles/transactions/TransactionDetailDrawer.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
        id: "Loading...",
        items: "" // Add items to the displayed transaction state
    });

    useEffect(() => {
        if (transaction != null) {
            setDisplayedTransaction(transaction);
        }
    }, [transaction]);

    const receipt = displayedTransaction.items || "No Receipt";

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
                    <h3>You've paid</h3>
                    <h1 className={styles.amount} data-testid="transaction-amount">SGD<span>{parseFloat(transaction.amount).toFixed(2)}</span></h1>
                    <h4 className={styles.timestamp} data-testid="transaction-timestamp">{formatDate(transaction.created_at)} • {formatTimestamp(transaction.created_at)}</h4>
                </div>
                <div className={styles.bottom}>
                    <div>
                        <p className={styles.label}>Payment Method</p>
                        <p className={styles.property} data-testid="transaction-payment-source">{transaction.payment_method}</p>
                        <p className={styles.label}>Transaction ID</p>
                        <p className={styles.property} data-testid="transaction-id">{transaction.transaction_id}</p>
                        <p className={styles.label}>Merchant Name</p>
                        <p className={styles.property} data-testid="transaction-customer-mobile">{transaction.user_name}</p>
                    </div>
                    <div className={styles.receiptContainer} style={{ textAlign: "left" }}>
                        <pre className={styles.receipt}>{receipt}</pre>
                    </div>
                    {(transaction.status !== "pending" && transaction.status !== "APPROVED" && transaction.status !== "REJECTED" && transaction.status !== "REFUNDED") && (
                        <button
                            onClick={() => navigate("/refunds/request", { state: { transaction: transaction } })}
                            className={styles.refundButton}
                            data-testid="refund-customer-button"
                        >
                            Request Refund
                        </button>
                    )}
                    {(transaction.status === "pending") && (
                        <button
                            onClick={() => navigate("/refunds/")}
                            className={styles.refundButton}
                            data-testid="review-refund-button"
                        >
                            Review Refund Request
                        </button>
                    )}
                </div>
            </div>
        </SwipeableDrawer>
    );
}

export default TransactionDetailDrawer;
