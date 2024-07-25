import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/refunds/RefundCard.module.css"
import { useNavigate } from "react-router-dom";
const RefundCard = ({
    refund
}) => {
    const navigate = useNavigate()

    const handleDetails = () => {
        navigate("/refunds/details", { state: { refund } });
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
                <p className={styles.amount} style={(refund.status === "APPROVED") ? {color: "#2DC937"} : (refund.status === "REJECTED") ? {color: "#EB3223"} : {color: "#000"}}>SGD  <span >{(refund.status === "APPROVED") ? "+": ""} {parseFloat(refund.refund_amount).toFixed(2)}</span></p>
            </div>
            {(refund.status === "pending") ? <p className={styles.status} style={{color: "#EB3223"}}>Waiting for merchant's approval</p> : <></>}
            {(refund.status === "APPROVED") ? <p className={styles.status}>Payment Refunded</p> : <></>}
            {(refund.status === "REJECTED") ? <p className={styles.status} style={{color: "#EB3223"}}>Request Rejected</p> : <></>}

        </div>
     );
}
 
export default RefundCard;