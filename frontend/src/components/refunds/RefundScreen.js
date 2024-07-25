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
                setRefunds(response.data); 
            } catch (error) {
                console.error('Failed to fetch refund requests:', error);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchRefundRequests();
    }, [fetchRefundRequests]);

    return (
        <div className={styles.screen}>
            <RefundScreenNav {...{setValue, value}} />
            <div className={styles.content}>
            {refunds.map(refund => (
                    <RefundCard key={refund.id} {...refund} />
                ))}
            </div>
        </div>
    );
};

export default RefundScreen;
