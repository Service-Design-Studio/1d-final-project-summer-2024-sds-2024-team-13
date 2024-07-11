import styles from "../../styles/Home/HomeTransactionCard.module.css"
import paynowIcon from "../../assets/paynowIcon.svg"
import paylahIcon from "../../assets/paylahIcon.svg"
import { ChevronRightOutlined } from "@mui/icons-material";

const HomeTransactionCard = ({
    transaction,
    toggleDrawer,
    setSelectedTransaction
}) => {

    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };


    return (
        <div className={styles.main} onClick={(event) => {
            setSelectedTransaction(transaction)
            toggleDrawer(true)(event);
        }}>
            <div className={styles.top}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={(transaction.payment_method === "Paynow") ? paynowIcon : paylahIcon} style={{ marginRight: "0.8rem" }} alt="" />
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "0.8rem" }}>TRANSFER FROM {transaction.payment_method.toUpperCase()}: <br />{transaction.customer_number[0]}XXX XXX</p>
                </div>
                <ChevronRightOutlined />
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>{formatTimestamp(transaction.created_at)}</p>
                <h3 className={styles.amount}>SGD <span>{parseFloat(transaction.amount).toFixed(2)}</span></h3>

            </div>

        </div>
    );
}

export default HomeTransactionCard;