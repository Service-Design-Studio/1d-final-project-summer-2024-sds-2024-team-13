import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/home/Home.module.css";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Notifications } from "@mui/icons-material";
import dbsIcon from "../assets/dbsIcon.png";
import dbsBanner from "../assets/dbsBanner.png";

const HomeScreen = () => {
    const navigate = useNavigate();
    const { customer } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 18) {
            return "Good afternoon";
        } else if (hour >= 18 && hour < 21) {
            return "Good evening";
        } else {
            return "Good night";
        }
    };

    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <Notifications className={styles.headIcon} />
                <p className={styles.title}>{getGreeting()}, <span>{customer.name}</span></p>
                <img src={dbsIcon} alt="DBS Logo" className={styles.headIcon} />
            </div>
            <div className={styles.content}>
                <div className={styles.banner}>
                    <a href="https://dbsbiz.as.r.appspot.com/" target="_blank" rel="noopener noreferrer">
                        <img src={dbsBanner} alt="DBS Banner" className={styles.bannerImage} />
                    </a>
                </div>
                <div className={styles.card}>
                    <div className={styles.top}>
                        <div>
                            <p className={styles.autoDebit}>AUTO DEBIT ON</p>
                            <p className={styles.amount}>SGD 888.88</p>
                        </div>
                        <button className={styles.outlineButton}><span>Manage</span></button>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.iconContainer}>
                            <button className={styles.iconItem} onClick={() => handleNavigation('/home')}>
                                <SendOutlinedIcon className={styles.icon} />
                                <p>Pay</p>
                            </button>
                            <button className={styles.iconItem} onClick={() => handleNavigation('/payment')}>
                                <QrCodeScannerOutlinedIcon className={styles.icon} />
                                <p>Scan</p>
                            </button>
                            <button className={styles.iconItem} onClick={() => handleNavigation('/home')}>
                                <FeedbackOutlinedIcon className={styles.icon} />
                                <p>Request</p>
                            </button>
                            <button className={styles.iconItem} onClick={() => handleNavigation('/history')}>
                                <ManageSearchOutlinedIcon className={styles.icon} />
                                <p>History</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;
