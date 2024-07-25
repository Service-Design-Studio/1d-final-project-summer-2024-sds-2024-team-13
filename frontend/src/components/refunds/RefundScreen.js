import RefundScreenNav from './RefundScreenNav';
import styles from "../../styles/refunds/RefundScreen.module.css";
import { useCallback, useEffect, useState } from 'react';
import RefundCard from './RefundCard';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../utils/axiosConfig';
const RefundScreen = () => {
    const { user } = useAuth();
    const [refunds, setRefunds] = useState([]);
    const [value, setValue] = useState(0);

    const fetchRefundRequests = useCallback(async () => {
        if (user) {
            const response = await axiosInstance.get(`/users/${user.user_id}/refund_requests`);
            const sortedRefunds = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRefunds(sortedRefunds);
        }
    }, [user]);

    useEffect(() => {
        fetchRefundRequests();
    }, [fetchRefundRequests]);

    const renderRefunds = () => {
        const filteredRefunds = refunds.filter(refund => {
            switch (value) {
                case 0:
                    return refund.status === "pending";
                case 1:
                    return refund.status === "APPROVED";
                case 2:
                    return refund.status === "REJECTED";
                default:
                    return true;
            }
        });
        
        if (filteredRefunds.length === 0) {
            const statusText = ["Pending", "Approved", "Rejected"];
            return <p>No {statusText[value]} Requests</p>;
        }

        return filteredRefunds.map((refund, index) => (
            <RefundCard key={refund.id} {...{ refund }} data-testid={`refund-card-${index}`} />
        ));
    };

    return (
        <div className={styles.screen} data-testid="requested-refunds-page">
            <RefundScreenNav {...{ setValue, value }} />
            <div className={styles.content}>
                {renderRefunds()}
            </div>
        </div>
    );
};

export default RefundScreen;
