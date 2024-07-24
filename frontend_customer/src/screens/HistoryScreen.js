import { useCallback, useEffect, useState } from "react";
import TransactionCard from "../components/transactions/TransactionCard";
import styles from "../styles/transactions/History.module.css"
import TransactionDetailDrawer from "../components/transactions/TransactionDetailDrawer";
import axios from "axios"
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HistoryScreen = () => {
    const [transactions, setTransactions] = useState({});
    const [selectedTransaction, setSelectedTransaction] = useState({
        amount: 0,
        created_at: new Date(),
        payment_method: "Loading...",
        id: "Loading..."

    })
    const [isOpen, setIsOpen] = useState(false)
    const { customer } = useAuth();

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open)
    };
    
    const fetchAllTransactions = useCallback(async () => {
        if (customer) {
            try {
                const response = await axiosInstance.get(`/customers/${customer.customer_id}/transactions`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const sortedTransactions = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
                    const date = new Date(transaction.created_at).toLocaleDateString("en-GB", {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });

                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(transaction);
                    return acc;
                }, {});

                setTransactions(groupedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [customer]);

    useEffect(() => {
        fetchAllTransactions();
    }, [fetchAllTransactions]);


    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <h1>History</h1>
            </div>
            <button className={styles.refundListButton} onClick={()=>navigate("/refunds")}>
                <div className="">
                    <p>Requested Refunds</p>
                </div>
                <ChevronRight/>
                </button>
            <div className={styles.transactionsList}>
            {Object.entries(transactions).map(([date, transactionsOnDate]) => (
          <div key={date} className={styles.transactionGroup}>
            <h4 className={styles.dateLabel}>{date}</h4>
            {transactionsOnDate.map((transaction) => (
              <TransactionCard
                key={transaction.transaction_id}
                transaction={transaction}
                toggleDrawer={toggleDrawer}
                setSelectedTransaction={setSelectedTransaction}
              />
            ))}
          </div>
        ))}

            </div>
            <TransactionDetailDrawer {...{ toggleDrawer, isOpen, transaction: selectedTransaction }} />
        </div>
    );
}

export default HistoryScreen;