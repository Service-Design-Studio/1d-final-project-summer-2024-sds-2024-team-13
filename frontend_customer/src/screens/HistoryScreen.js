import { useCallback, useEffect, useState } from "react";
import TransactionCard from "../components/transactions/TransactionCard";
import styles from "../styles/transactions/History.module.css"
import TransactionDetailDrawer from "../components/transactions/TransactionDetailDrawer";
import axios from "axios"
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";

const HistoryScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({
        amount: 0,
        created_at: new Date(),
        payment_method: "Loading...",
        id: "Loading..."

    })
    const [isOpen, setIsOpen] = useState(false)
    const { customer } = useAuth();
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
                setTransactions(sortedTransactions);
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
            <div className={styles.transactionsList}>
                {transactions.map((item, i) => (
                    <TransactionCard {...{ toggleDrawer, transaction: item, setSelectedTransaction}} key={item.id} />
                ))}

            </div>
            <TransactionDetailDrawer {...{ toggleDrawer, isOpen, transaction: selectedTransaction }} />
        </div>
    );
}

export default HistoryScreen;