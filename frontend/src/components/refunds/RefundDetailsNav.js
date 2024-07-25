import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from "@mui/icons-material";
import styles from "../../styles/refunds/RefundDetailsNav.module.css";

const RefundDetailsNav = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.main}>
            <button className={styles.backButton} onClick={handleBack} data-testid="back-button">
                <ArrowBackIosNew />
            </button>
            <h2 className={styles.title} data-testid="refund-details-title">Refund Details</h2>
        </div>
    );
};

export default RefundDetailsNav;