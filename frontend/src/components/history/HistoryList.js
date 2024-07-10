import styles from "../../styles/history/HistoryList.module.css"
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';

const HistoryList = ({
    filterOption,
    displayedTransactions
}) => {
    const [groupedTransactions, setGroupedTransactions] = useState({});
    useEffect(() => {
        const grouped = displayedTransactions.reduce((acc, transaction) => {
            const date = new Date(transaction.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(transaction);
            return acc;
        }, {});

        setGroupedTransactions(grouped);
    }, [displayedTransactions]);
    const current = new Date();

    return (
        <div className={styles.main}>
            {(filterOption === "thismonth" || filterOption === "lastmonth") ? <div className={styles.monthInfo}>
                <p>
                    {(filterOption === "thismonth") ? current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase() : ""}
                    {(filterOption === "lastmonth") ? (() => {
                        const current = new Date();
                        current.setMonth(current.getMonth() - 1);  
                        return current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
                    })() : ""}
                </p>
                <p>MONTHLY: +${displayedTransactions.reduce((total, transaction) => total + transaction.amount, 0).toFixed(2)}</p>
            </div> : <></>}
            {(displayedTransactions.length > 0) ? Object.keys(groupedTransactions).map(date => {
                const dailyTransactions = groupedTransactions[date];
                const dailyTotal = dailyTransactions.reduce((total, transaction) => total + transaction.amount, 0);
                return (
                    <div key={date} style = {{marginBottom: "18px"}}>
                        <div className={styles.dayInfo}>
                            <p>{date}</p>
                            <p>DAILY: +${dailyTotal.toFixed(2)}</p>
                        </div>
                        {dailyTransactions.map(transaction => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                );
            }) : 
            <div className={styles.noTransactions}>
                <WarningIcon/>
                <h3>No Transactions Found</h3>
            </div>
            }
        </div>
    );
}

export default HistoryList;