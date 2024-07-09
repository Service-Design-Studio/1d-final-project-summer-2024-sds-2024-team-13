import { useCallback, useEffect, useState } from "react";
import DropdownFilter from "../components/history/DropdownFilter";
import HistoryNav from "../components/history/HistoryNav";
import TransactionCard from "../components/history/TransactionCard";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/history/History.module.css"
import axiosInstance from "../utils/axiosConfig";

const HistoryScreen = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    
    const fetchTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                setTransactions(response.data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5));

            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return ( 
        <div className={styles.main}>
            <HistoryNav/>
            <div className={styles.content}>
                <DropdownFilter/>
                <div className={styles.monthInfo}>
                    <p>JUNE 2024</p>
                    <p>MONTHLY: +$8534.30</p>
                </div>
                <div className={styles.dayInfo}>
                    <p>17 Jun 2024</p>
                    <p>DAILY: +$164.50</p>
                </div>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>

            </div>
        </div>
     );
}
 
export default HistoryScreen;