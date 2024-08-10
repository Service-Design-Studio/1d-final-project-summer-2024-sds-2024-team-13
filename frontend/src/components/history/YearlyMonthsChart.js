import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/history/InsightsGraph.module.css"
import axiosInstance from "../../utils/axiosConfig";
import { Bar } from 'react-chartjs-2';

const YearlyMonthsChart = () => {
    const { user } = useAuth();
    const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));

    const fetchMonthlyTotals = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/transactions`);
                const monthlySums = Array(12).fill(0);
    
                response.data.forEach(transaction => {
                    const transactionDate = new Date(transaction.created_at);
                    const month = transactionDate.getMonth(); // month index (0-11)
                    monthlySums[month] += parseFloat(transaction.amount);
                });
    
                setMonthlyTotals(monthlySums);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchMonthlyTotals();
    }, [fetchMonthlyTotals]);

    const data = {
        labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: monthlyTotals,
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
            <p className={styles.label}>Monthly Earnings</p>
            <Bar data={data} options={options} />
        </div>
    );
}

export default YearlyMonthsChart;
