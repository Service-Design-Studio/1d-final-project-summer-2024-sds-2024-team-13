import RefundScreenNav from './RefundScreenNav';
import styles from "../../styles/refunds/RefundScreen.module.css";
import { useCallback, useEffect, useState } from 'react';
import RefundCard from './RefundCard';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';

const RefundScreen = () => {
    const { user } = useAuth();
    const [refunds, setRefunds] = useState([]);
    const [value, setValue] = useState(0)
    const fetchRefundRequests = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/refund_requests`);
                const sortedRefunds = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRefunds(sortedRefunds);
            } catch (error) {
                console.error('Failed to fetch refund requests:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchRefundRequests();
    }, [fetchRefundRequests]);

    return (
        <div className={styles.screen} data-testid="requested-refunds-page">
            <RefundScreenNav {...{ setValue, value }} />
            <div className={styles.content} data-testid="refund-content">
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
                    <RefundCard key={refund.id} {...{ refund }} />
                ))}
            </div>
        </div>
    );
};

export default RefundScreen;
