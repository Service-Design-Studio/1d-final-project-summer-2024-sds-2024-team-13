import { useAuth } from "../context/AuthContext";
import styles from "../styles/home/Home.module.css"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
const HomeScreen = () => {
    const { customer } = useAuth()
    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <h2 className={styles.title}>Good morning, {customer.name}</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.card}>
                    <div className={styles.top}>
                        <div>
                            <p className={styles.autoDebit}>AUTO DEBIT ON</p>
                            <p className={styles.amount}>SGD 888.00</p>
                        </div>
                        <button className={styles.outlineButton}><span>Manage</span></button>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.iconContainer}>
                            <div className={styles.iconItem}>
                                <SendOutlinedIcon className={styles.icon} />
                                <p>Pay</p>
                            </div>
                            <div className={styles.iconItem}>
                                <QrCodeScannerOutlinedIcon className={styles.icon} />
                                <p>Scan</p>
                            </div>
                            <div className={styles.iconItem}>
                                <FeedbackOutlinedIcon className={styles.icon} />
                                <p>Request</p>
                            </div>
                            <div className={styles.iconItem}>
                                <ManageSearchOutlinedIcon className={styles.icon} />
                                <p>History</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;