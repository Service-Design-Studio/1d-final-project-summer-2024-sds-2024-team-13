import { ChevronRight } from "@mui/icons-material";
import styles from "../../styles/refunds/RefundCard.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import { useCallback, useEffect, useState } from "react";
const RefundCard = ({
    refund
}) => {
    const navigate = useNavigate()
    const { customer } = useAuth();
    const [transaction, setTransaction] = useState({})
    const fetchTransactionDetails = useCallback(async () => {
        if (customer && refund?.transaction_id) {
            try {
                const response = await axiosInstance.get(`/customers/${customer.customer_id}/transactions/${refund.transaction_id}`);
                if (response.status === 200) {
                    console.log('Transaction details:', response.data);
                    setTransaction(response.data);  
                } else {
                    console.error('Failed to fetch transaction:', response.status);
                }
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        }
    }, [customer, refund?.transaction_id]);

    useEffect(() => {
        fetchTransactionDetails();
    }, [fetchTransactionDetails]);
    const handleDetails = () => {
        navigate("/refunds/details", { state: { refund } });
    }
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase();
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };
    return ( 
        <div className={styles.main} onClick={()=>{
            handleDetails();
            }} data-testid={`refund-card-${refund.id}`}
            >
            <div className={styles.section}>
                <div className={styles.details}>
                    <p>{(refund.status === "APPROVED") ? "REFUNDED FROM" : "TRANSFER FROM:"} {transaction?.payment_method?.toUpperCase()}</p>
                    <p>{transaction?.customer_number}</p>
                </div>
                <ChevronRight sx={{color: "#bbb"}}/>
            </div>
            <div className={styles.section}>
                <p className={styles.timestamp}>{formatDate(refund?.updated_at)}, {formatTimestamp(refund?.updated_at)}</p>
                <p className={styles.amount} style={(refund.status === "APPROVED") ? {color: "#2DC937"} : (refund.status === "REJECTED") ? {color: "#EB3223"} : {color: "#000"}}>SGD  <span >{(refund.status === "APPROVED") ? "+": ""} {parseFloat(refund.refund_amount).toFixed(2)}</span></p>
            </div>
            {(refund.status === "pending") ? <p className={styles.status} style={{color: "#EB3223"}}>Waiting for merchant's approval</p> : <></>}
            {(refund.status === "APPROVED") ? <p className={styles.status}>Payment Refunded</p> : <></>}
            {(refund.status === "REJECTED") ? <p className={styles.status} style={{color: "#EB3223"}}>Request Rejected</p> : <></>}

        </div>
     );
}
 
export default RefundCard;