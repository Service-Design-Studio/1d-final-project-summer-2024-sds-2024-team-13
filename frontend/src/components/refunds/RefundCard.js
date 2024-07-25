import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/refunds/RefundCard.module.css"
import { useNavigate } from "react-router-dom";
const RefundCard = ({
    refund
}) => {
    const navigate = useNavigate()

    const handleDetails = () => {
        if (refund.status === "APPROVED" || refund.status === "REJECTED") {
            navigate("/refunds/details", { state: { refund } });
        } else  if (refund.status === "pending") {
            navigate("/refunds/review", { state: { refund } });
        }
    }
    return ( 
        <div className={styles.main} onClick={()=>{
            handleDetails();
            }}>
            <div className={styles.section}>
                <div className={styles.details}>
                    <p>{(refund.status === "APPROVED") ? "REFUNDED FROM" : "TRANSFER FROM:"}</p>
                    <p>12345678</p>
                </div>
                <ChevronRight sx={{color: "#bbb"}}/>
            </div>
            <div className={styles.section}>
                <p className={styles.timestamp}>17 Jul 2024</p>
                <p className={styles.amount} style={(refund.status === "APPROVED") ? {color: "#aaa"} : {color: "#000"}}>SGD  <span>{(refund.status === "APPROVED") ? "-": ""} {parseFloat(refund.refund_amount).toFixed(2)}</span></p>
            </div>
            {(refund.status === "pending") ? <p className={styles.status} style={{color: "#EB3223"}}>Waiting for your action</p> : <></>}
            {(refund.status === "APPROVED") ? <p className={styles.status}>Payment Refunded</p> : <></>}
            {(refund.status === "REJECTED") ? <p className={styles.status}>Request Rejected</p> : <></>}

        </div>
     );
}
 
export default RefundCard;