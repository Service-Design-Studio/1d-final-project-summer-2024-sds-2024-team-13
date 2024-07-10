import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/history/InsightsGraph.module.css"
import axiosInstance from "../../utils/axiosConfig";
import { Bar } from 'react-chartjs-2';

const YearlyMonthsChart = () => {
    const { user } = useAuth();
    const [monthlyAverages, setMonthlyAverages] = useState(Array(12).fill(0));
    const fetchMonthlyAverages = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const monthlySums = Array(12).fill(0);
                const monthlyCounts = Array(12).fill(0);
    
                response.data.forEach(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    const year = transactionDate.getFullYear();
                    if (year >= 2017 && year <= 2024) {
                        const month = transactionDate.getMonth(); // month index (0-11)
                        monthlySums[month] += transaction.amount;
                        monthlyCounts[month]++;
                    }
                });
    
                const monthlyAverages = monthlySums.map((sum, index) => monthlyCounts[index] > 0 ? sum / monthlyCounts[index] : 0);
                setMonthlyAverages(monthlyAverages);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchMonthlyAverages();
    }, [fetchMonthlyAverages]);

    const data = {
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        datasets: [
            {
                label: 'Average Monthly Earnings',
                data: monthlyAverages,
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
            <p className={styles.label}>Yearly Average Monthly Earnings</p>
            <Bar data={data} options={options} />
        </div>
    );
}

export default YearlyMonthsChart;