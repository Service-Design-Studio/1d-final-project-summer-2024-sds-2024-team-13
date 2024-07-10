import { useCallback, useEffect, useState } from "react";
import HomeNav from "../components/home/HomeNav";
import HomeTransactionCard from "../components/home/HomeTransactionCard";
import MainCard from "../components/home/MainCard";
import styles from "../styles/Home/Home.module.css"
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosConfig";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import HourlyChart from "../components/home/HourlyChart";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const HomeScreen = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [lastRefresh, setLastRefresh] = useState(null);
    const [todayTotal, setTodayTotal] = useState(0);
    const [hourlyData, setHourlyData] = useState([]);
    const [cutoffTime, setCutoffTime] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    const updateCutoffTime = useCallback(async (newCutoffTime) => {
        if (!user) return;
    
        try {
            console.log("UTC time to send: " + newCutoffTime);
            await axiosInstance.put(`/users/${user.user_id}/earnings_cutoff`, {
                earnings_cutoff_time: newCutoffTime
            });
        } catch (error) {
            console.error('Failed to update earnings cutoff time:', error);
        }
    }, [user]);
    const fetchCutoffTime = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/earnings_cutoff`);
                const fetchedTime = response.data.earnings_cutoff_time;

                if (fetchedTime) {
                    const cutoffDate = new Date(fetchedTime);
                    if (cutoffDate.toString() !== "Invalid Date") {
                        const updatedCutoffTime = new Date();
                        updatedCutoffTime.setUTCHours(cutoffDate.getUTCHours(), cutoffDate.getUTCMinutes(), 0, 0);
                        setCutoffTime(updatedCutoffTime);
                        console.log("Validated and Updated Cutoff Date:", updatedCutoffTime);
                    } else {
                        console.error('Parsed date is invalid.');
                    }
                } else {
                    const defaultCutoff = new Date();
                    defaultCutoff.setHours(0, 0, 0, 0);
                    const dayJSTime = dayjs(defaultCutoff)
                    updateCutoffTime(dayJSTime.toISOString());
                    setCutoffTime(defaultCutoff);
                    console.log("Set and updated default cutoff time to 12 AM local.");
                }
            } catch (error) {
                console.error('Failed to fetch earnings cutoff time:', error);
            }
        }
    }, [user, updateCutoffTime]);



    const fetchTransactions = useCallback(async () => {
        if (user && cutoffTime) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const now = new Date();
                const cutoffHour = cutoffTime.getHours();
                const cutoffMinute = cutoffTime.getMinutes();

                let start, end;
                const todayCutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), cutoffHour, cutoffMinute);
                if (now >= todayCutoff) {
                    start = todayCutoff;
                    end = new Date(todayCutoff.getTime() + 86400000);
                } else {
                    start = new Date(todayCutoff.getTime() - 86400000);
                    end = todayCutoff;
                }

                const todayTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    return transactionDate >= start && transactionDate < end;
                });

                setTransactions(todayTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5));
                setLastRefresh(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

                const totalAmount = todayTransactions.reduce((total, transaction) => total + transaction.amount, 0);
                setTodayTotal(totalAmount);

                const hourlyCounts = aggregateTransactionsByHour(todayTransactions, start);
                setHourlyData(hourlyCounts);

            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user, cutoffTime]);

    // Helper function to aggregate transactions by hour
    const aggregateTransactionsByHour = (transactions, startOfToday) => {
        const hourlyTotals = Array(24).fill(0);
        transactions.forEach(transaction => {
            const date = new Date(transaction.created_at);
            const hour = date.getHours() - startOfToday.getHours();
            const index = hour < 0 ? 24 + hour : hour;
            hourlyTotals[index] += transaction.amount;
        });
        return hourlyTotals;
    };

    useEffect(() => {
        fetchCutoffTime();
    }, [fetchCutoffTime]);

    useEffect(() => {
        const intervalId = setInterval(() => {
        fetchTransactions();
    }, 4000);

    return () => clearInterval(intervalId)
    }, [fetchTransactions]);

    const handleReload = () => {
        fetchTransactions();
    };

    // Format cutoff time for display
    const formattedCutoffTime = cutoffTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div className={styles.screen}>
            <HomeNav {...{ handleReload }} />
            <div className={styles.content}>
                <MainCard {...{ lastRefresh, todayTotal }} />
                <HourlyChart {...{ hourlyData, formattedCutoffTime }} />
                <div className={styles.transcContainer}>
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px" }}>
                        LATEST TRANSACTIONS
                    </p>
                    {transactions.map(transaction => (
                        <HomeTransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;