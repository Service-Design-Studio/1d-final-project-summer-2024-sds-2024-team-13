import { useCallback, useEffect, useState } from "react";
import DropdownFilter from "../components/history/DropdownFilter";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/history/History.module.css"
import axiosInstance from "../utils/axiosConfig";
import HistoryList from "../components/history/HistoryList";
import Insights from "../components/history/Insights";

const HistoryScreen = () => {
    const { user } = useAuth();
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    
    const [filterOption, setFilterOption] = useState("thismonth")

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchThisMonthsTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const current = new Date();
                const currentMonth = current.getMonth();
                const currentYear = current.getFullYear();

                const monthlyTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    return (
                        transactionDate.getMonth() === currentMonth &&
                        transactionDate.getFullYear() === currentYear
                    );
                });

                const sortedTransactions = monthlyTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDisplayedTransactions(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    const fetchLastMonthsTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const current = new Date();
                let lastMonth = current.getMonth() - 1;
                let lastMonthYear = current.getFullYear();
    
                if (lastMonth === -1) {
                    lastMonth = 11; 
                    lastMonthYear -= 1; 
                }
    
                const lastMonthTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    return (
                        transactionDate.getMonth() === lastMonth &&
                        transactionDate.getFullYear() === lastMonthYear
                    );
                });
    
                const sortedTransactions = lastMonthTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDisplayedTransactions(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    const fetchTodaysTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const today = new Date();
                today.setHours(0, 0, 0, 0);  
    
                const todaysTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    transactionDate.setHours(0, 0, 0, 0);
                    return transactionDate.getTime() === today.getTime();
                });
    
                const sortedTransactions = todaysTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDisplayedTransactions(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    const fetchYesterdaysTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const today = new Date();
                today.setHours(0, 0, 0, 0);  
    
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);  
    
                const yesterdaysTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    transactionDate.setHours(0, 0, 0, 0); 
                    return transactionDate.getTime() === yesterday.getTime();
                });
    
                const sortedTransactions = yesterdaysTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDisplayedTransactions(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);
    
    const fetchTransactionsInRange = useCallback(async (startDate, endDate) => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);

                startDate.setHours(0, 0, 0, 0);
    
                endDate.setHours(23, 59, 59, 999);
    
                const rangeTransactions = response.data.filter(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    return transactionDate >= startDate && transactionDate <= endDate;
                });
    
                const sortedTransactions = rangeTransactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setDisplayedTransactions(sortedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);
    
    

    useEffect(() => {
        if (filterOption === "thismonth") {
            fetchThisMonthsTransactions();
        } else if (filterOption === "lastmonth") {
            fetchLastMonthsTransactions();
        } else if (filterOption === "today") {
            fetchTodaysTransactions();
        } else if (filterOption === "yesterday") {
            fetchYesterdaysTransactions();
        } else if (filterOption === "custom") {
            fetchTransactionsInRange(startDate, endDate);
        }
    }, [filterOption, fetchLastMonthsTransactions, fetchThisMonthsTransactions, fetchTodaysTransactions, fetchYesterdaysTransactions, fetchTransactionsInRange, startDate, endDate]);
    

    return ( 
        <div className={styles.main}>
            <Insights/>
            <div className={styles.content}>
                <DropdownFilter {...{filterOption, setFilterOption, startDate, setStartDate, setEndDate, endDate}}/>
                <HistoryList {...{filterOption, displayedTransactions: displayedTransactions}}/>

            </div>
        </div>
     );
}
 
export default HistoryScreen;