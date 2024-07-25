import RefundScreenNav from './RefundScreenNav';
import styles from "../../styles/refunds/RefundScreen.module.css";
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import axiosInstance from '../../utils/axiosConfig';
import RefundCard from './RefundCard';


const RefundScreen = () => {
    const [value, setValue] = useState(0);
    const { customer } = useAuth();
    const [refunds, setRefunds] = useState([]);
    const fetchRefundRequests = useCallback(async () => {
        if (customer) {
            try {
                const response = await axiosInstance.get(`/customers/${customer.customer_id}/refund_requests`);
                const sortedRefunds = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRefunds(sortedRefunds);
            } catch (error) {
                console.error('Failed to fetch refund requests:', error);
            }
        }
    }, [customer]);

    useEffect(() => {
        fetchRefundRequests();
    }, [fetchRefundRequests]);


    return (
        <div className={styles.screen} data-testid="requested-refunds-page">
            <RefundScreenNav {...{value, setValue}}/>
            <div className={styles.content}>
            {refunds.filter(refund => {
                    switch (value) {
                        case 0: // Pending refunds
                            return refund.status === "pending";
                        case 1: // Approved refunds
                            return refund.status === "APPROVED";
                        case 2: // Rejected refunds
                            return refund.status === "REJECTED";
                        default:
                            return true; // If no value matches, return all
                    }
                }).map(refund => (
                    <RefundCard key={refund.id} {...{ refund }} data-testid={`refund-card-${index}`} />
                ))}
            </div>
        </div>
    );
};

export default RefundScreen;
