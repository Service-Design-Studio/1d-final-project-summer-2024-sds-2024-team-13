import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/history/InsightsGraph.module.css"
import axiosInstance from "../../utils/axiosConfig";
import { Bar } from 'react-chartjs-2';

const DailyEarningsChart = () => {
    const { user } = useAuth();
    const [dailyTotals, setDailyTotals] = useState(Array(7).fill(0));

    const fetchDailyTotals = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const dailySums = Array(7).fill(0);

                const currentDate = new Date();
                const currentWeekDay = currentDate.getDay(); // Get current weekday (0-6)
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentWeekDay); // Set to start of the week (Sunday)
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of the week (Saturday)

                response.data.forEach(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    if (transactionDate >= startOfWeek && transactionDate <= endOfWeek) {
                        const dayOfWeek = transactionDate.getDay(); // Get day of the week (0-6)
                        dailySums[dayOfWeek] += parseFloat(transaction.amount);
                    }
                });

                setDailyTotals(dailySums);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchDailyTotals();
    }, [fetchDailyTotals]);

    const data = {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                label: 'Daily Earnings',
                data: dailyTotals,
                backgroundColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                },
                grid: {
                    display: false,
                },
                display: false,
            },
            x: {
                ticks: {
                    color: 'white',
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className={styles.main}>
            <p className={styles.label}>Daily Earnings for This Week</p>
            <Bar data={data} options={options} />
        </div>
    );
}

export default DailyEarningsChart;
