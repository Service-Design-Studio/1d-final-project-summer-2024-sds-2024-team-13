import styles from "../../styles/history/TransactionCard.module.css"
import { ChevronRightOutlined } from "@mui/icons-material";

const TransactionCard = ({
}) => {
    return ( 
        <div className={styles.main}>
            <div className={styles.top}>
                <p style={{margin: 0, fontWeight: 600, fontSize: "0.8rem"}}>TRANSFER FROM PAYLAH: <br/>8XXX XXX</p>
                <ChevronRightOutlined/>
            </div>
            <div className={styles.bottom}>
                <p className={styles.timestamp}>09:41:21 AM</p>
                <h3 className={styles.amount}>SGD <span>6.50</span></h3>

            </div>
        </div>
     );
}
export default TransactionCard;