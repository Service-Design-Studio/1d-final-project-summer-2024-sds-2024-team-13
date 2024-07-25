import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from "@mui/icons-material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from "../../styles/refunds/RefundScreenNav.module.css";

const RefundScreenNav = ({
    value,
    setValue
}) => {
    const navigate = useNavigate();
    

    const handleBack = () => {
        navigate("/history");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>
                    <ArrowBackIosNew />
                </button>
                <h2 className={styles.title}>Requested Refunds</h2>
            </div>
            <Tabs value={value} onChange={handleChange} centered className={styles.tabs}>
                <Tab  label="Requests" data-testid="pending-tab" />
                <Tab  label="Refunded" data-testid="refunded-tab" />
                <Tab  label="Rejected" data-testid="rejected-tab" />
            </Tabs>
        </div>
    );
};

export default RefundScreenNav;
