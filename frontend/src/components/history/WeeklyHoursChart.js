import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/history/InsightsGraph.module.css"
import axiosInstance from "../../utils/axiosConfig";
import { Bar } from 'react-chartjs-2';

const WeeklyHoursChart = () => {
    const { user } = useAuth();
    const [hourlyAverages, setHourlyAverages] = useState(Array(24).fill(0));

    const fetchThisWeeksTransactions = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const current = new Date();
                current.setHours(0, 0, 0, 0);
                const weekStart = new Date(current.setDate(current.getDate() - current.getDay()));
                const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);

                const hourlySums = Array(24).fill(0);
                const hourlyCounts = Array(24).fill(0);

                response.data.forEach(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    if (transactionDate >= weekStart && transactionDate <= weekEnd) {
                        const hour = transactionDate.getHours();
                        hourlySums[hour] += parseFloat(transaction.amount);
                        hourlyCounts[hour]++;
                    }
                });

                const averages = hourlySums.map((sum, index) => hourlyCounts[index] > 0 ? sum / hourlyCounts[index] : 0);
                setHourlyAverages(averages);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchThisWeeksTransactions();
    }, [fetchThisWeeksTransactions]);

    const data = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: 'Average Hourly Transactions',
                data: hourlyAverages,
                backgroundColor: '##fff',
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
            <p className={styles.label}>Weekly Average Hourly Earnings</p>
            <Bar data={data} options={options} />
        </div>
    );
}

export default WeeklyHoursChart;