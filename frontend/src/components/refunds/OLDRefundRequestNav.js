import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from "@mui/icons-material";
import styles from "../../styles/refunds/OLDRefundRequestNav.module.css";

const RefundRequestNav = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.main}>
            <button className={styles.backButton} onClick={handleBack} data-testid="back-button">
                <ArrowBackIosNew />
            </button>
            <h2 className={styles.title}>Refund Customer</h2>
        </div>
    );
};

export default RefundRequestNav;