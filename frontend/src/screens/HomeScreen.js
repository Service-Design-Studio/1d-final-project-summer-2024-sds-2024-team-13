import { useCallback, useEffect, useState } from "react";
import HomeNav from "../components/home/HomeNav";
import HomeTransactionCard from "../components/home/HomeTransactionCard";
import MainCard from "../components/home/MainCard";
import styles from "../styles/Home/Home.module.css"
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosConfig";

const HomeScreen = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(null);
    const [todayTotal, setTodayTotal] = useState(0);

    const fetchTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                setTransactions(response.data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5));
                setLastRefresh(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

                const today = new Date().toISOString().split('T')[0];
                const todayTransactions = response.data.filter(transaction => transaction.created_at.split('T')[0] === today);
                const totalAmount = todayTransactions.reduce((total, transaction) => total + transaction.amount, 0);
                setTodayTotal(totalAmount);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchTransactions();
        const intervalId = setInterval(fetchTransactions, 3000);

        return () => clearInterval(intervalId);
    }, [fetchTransactions]);

    const handleReload = () => {
        fetchTransactions();
    };

    const today = new Date();

    return (
        <div className={styles.screen}>
            <HomeNav {...{ handleReload }} />
            <div className={styles.content}>
                <MainCard {...{ lastRefresh, todayTotal }} />
                <div className={styles.transcContainer}>
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px" }}>TODAY, {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()}</p>
                    {transactions.map(transaction => (
                        <HomeTransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;