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

    const getFilteredRefunds = (status) => {
        return refunds.filter(refund => refund.status === status.toUpperCase());
    };

    const renderRefundCards = () => {
        const filteredRefunds = getFilteredRefunds(value === 0 ? "pending" : (value === 1 ? "APPROVED" : "REJECTED"));
        if (filteredRefunds.length === 0) {
            return <p>{`No ${value === 0 ? "Pending" : (value === 1 ? "Approved" : "Rejected")} Requests`}</p>;
        }
        return filteredRefunds.map((refund, index) => (
            <RefundCard key={refund.id} {...{ refund }} data-testid={`refund-card-${index}`} />
        ));
    };

    return (
        <div className={styles.screen} data-testid="requested-refunds-page">
            <RefundScreenNav {...{value, setValue}}/>
            <div className={styles.content}>
                {renderRefundCards()}
            </div>
        </div>
    );
};

export default RefundScreen;