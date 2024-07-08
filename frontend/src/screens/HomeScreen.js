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

    const handleReload = () => {
        fetchTransactions();
    };

    return (
        <div className={styles.screen}>
            <HomeNav {...{handleReload}} />
            <div className={styles.content}>
                <MainCard />
                <div className={styles.transcContainer}>
                    <p style={{fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px"}}>TODAY, 17 JUN</p>
                    {transactions.map(transaction => (
                        <HomeTransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;