import DropdownFilter from "../components/history/DropdownFilter";
import HistoryNav from "../components/history/HistoryNav";
import TransactionCard from "../components/history/TransactionCard";
import styles from "../styles/history/History.module.css"

const HistoryScreen = () => {
    return ( 
        <div className={styles.main}>
            <HistoryNav/>
            <div className={styles.content}>
                <DropdownFilter/>
                <div className={styles.monthInfo}>
                    <p>JUNE 2024</p>
                    <p>MONTHLY: +$8534.30</p>
                </div>
                <div className={styles.dayInfo}>
                    <p>17 Jun 2024</p>
                    <p>DAILY: +$164.50</p>
                </div>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>

            </div>
        </div>
     );
}
 
export default HistoryScreen;