import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from "@mui/icons-material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "../../styles/refunds/RequestRefundNav.module.css";

const RequestRefundNav = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleBack = () => {
        navigate(-1);
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
                <Tab icon={<HourglassEmptyIcon />} label="Pending" />
                <Tab icon={<CheckCircleIcon />} label="Refunded" />
                <Tab icon={<CancelIcon />} label="Rejected" />
            </Tabs>
        </div>
    );
};

export default RequestRefundNav;
