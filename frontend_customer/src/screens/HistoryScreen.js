import { useState } from "react";
import TransactionCard from "../components/transactions/TransactionCard";
import styles from "../styles/transactions/History.module.css"
import TransactionDetailDrawer from "../components/transactions/TransactionDetailDrawer";

const HistoryScreen = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = (open) => (event) => {
        console.log('efiekfh')
        if (
            event && 
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setIsOpen(open)
    };

    return ( 
        <div className={styles.screen}>
            <div className={styles.header}>
                <h1>History</h1>
            </div>
            <div className={styles.transactionsList}>
                <TransactionCard {...{toggleDrawer}}/>
               
            </div>
            <TransactionDetailDrawer {...{toggleDrawer, isOpen}}/>
        </div>
     );
}
 
export default HistoryScreen;