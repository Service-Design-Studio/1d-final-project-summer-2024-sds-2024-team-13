import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/refunds/RefundCard.module.css"
import { useNavigate } from "react-router-dom";
const RefundCard = () => {
    const navigate = useNavigate()
    return ( 
        <div className={styles.main} onClick={()=>navigate("/refunds/review")}>
            <div className={styles.section}>
                <div className={styles.details}>
                    <p>TRANSFER FROM PAYLAH:</p>
                    <p>12345678</p>
                </div>
                <ChevronRight sx={{color: "#bbb"}}/>
            </div>
            <div className={styles.section}>
                <p className={styles.timestamp}>17 Jul 2024</p>
                <p className={styles.amount}>SGD  <span>524.70</span></p>
            </div>
            <p className={styles.status}>Waiting for your action</p>
        </div>
     );
}
 
export default RefundCard;