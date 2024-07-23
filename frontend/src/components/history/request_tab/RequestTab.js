import RequestNav from './RequestNav';
import styles from "../../../styles/history/request_tab/RequestTab.module.css";

const RequestTab = () => {

    return (
        <div className={styles.screen}>
            <RequestNav />
            <div className={styles.content}>
                
            </div>
        </div>
    );
};

export default RequestTab;
