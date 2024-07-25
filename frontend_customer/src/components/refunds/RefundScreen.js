import RefundScreenNav from './RefundScreenNav';
import styles from "../../styles/refunds/RefundScreen.module.css";

const RefundScreen = () => {

    return (
        <div className={styles.screen}>
            <RefundScreenNav />
            <div className={styles.content}>
                
            </div>
        </div>
    );
};

export default RefundScreen;
