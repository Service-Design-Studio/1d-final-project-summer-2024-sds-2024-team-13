import RequestRefundNav from './RequestRefundNav';
import styles from "../../../styles/history/request_tab/RequestRefund.module.css";

const RequestRefund = () => {

    return (
        <div className={styles.screen}>
            <RequestRefundNav />
            <div className={styles.content}>
                
            </div>
        </div>
    );
};

export default RequestRefund;
