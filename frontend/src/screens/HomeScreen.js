import React, { useCallback, useEffect, useState } from "react";
import HomeNav from "../components/home/HomeNav";
import HomeTransactionCard from "../components/home/HomeTransactionCard";
import MainCard from "../components/home/MainCard";
import styles from "../styles/Home/Home.module.css"
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosConfig";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import HourlyChart from "../components/home/HourlyChart";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const HomeScreen = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(null);
    const [todayTotal, setTodayTotal] = useState(0);
    const [hourlyData, setHourlyData] = useState([]);
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

                const hourlyCounts = aggregateTransactionsByHour(todayTransactions);
                setHourlyData(hourlyCounts);

            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    const aggregateTransactionsByHour = (transactions) => {
        const hourlyCounts = Array(24).fill(0);
        transactions.forEach(transaction => {
            const date = new Date(transaction.created_at);
            const hour = date.getHours();
            hourlyCounts[hour]++;
        });
        return hourlyCounts;
    };
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
                <HourlyChart {...{hourlyData}}/>
                <div className={styles.transcContainer}>
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px" }}>LATEST FROM TODAY, {today.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase()}</p>
                    {transactions.map(transaction => (
                        <HomeTransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;