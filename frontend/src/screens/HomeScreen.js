import TransactionCard from "../components/history/TransactionCard";
import HomeNav from "../components/home/HomeNav";
import HomeTransactionCard from "../components/home/HomeTransactionCard";
import MainCard from "../components/home/MainCard";
import styles from "../styles/Home/Home.module.css"

const HomeScreen = () => {
    return (
        <div className={styles.screen}>
            <HomeNav />
            <div className={styles.content}>
                <MainCard />
                <div className={styles.transcContainer}>
                    <p style={{fontSize: "0.8rem", fontWeight: "bold", marginBottom: "8px"}}>TODAY, 17 JUN</p>
                    <HomeTransactionCard isHighlighted={true}/>
                    <HomeTransactionCard isHighlighted={true}/>
                    <HomeTransactionCard/>
                    <HomeTransactionCard/>
                    <HomeTransactionCard/>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;