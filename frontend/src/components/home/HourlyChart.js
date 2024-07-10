import styles from "../../styles/Home/HourlyChart.module.css"
import { Bar } from 'react-chartjs-2';


const HourlyChart = ({
    hourlyData
}) => {
    const data = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: 'Number of Transactions',
                data: hourlyData,
                backgroundColor: '#FB7C93',
                borderColor: '#FD5A77',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
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
    };

    return (
        <div className={styles.main}>
            <h4 className={styles.title}>Number of Transactions (Hourly)</h4>
            <Bar data={data} options={options} />

        </div>
    );
}

export default HourlyChart