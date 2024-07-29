import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from "@mui/icons-material";
import styles from "../styles/TopNav.module.css";

const TopNav = ({ title, pathname, hasBackButton, handleBack }) => {
    const navigate = useNavigate();

    const onBackClick = () => {
        if (handleBack) {
            handleBack();
        } else if (pathname === -1) {
            navigate(-1); // Go back to the previous page
        } else {
            navigate(pathname);
        }
    };

    return (
        <div className={styles.main}>
            {hasBackButton === "yes" && (
                <button className={styles.backButton} onClick={onBackClick} data-testid="back-button">
                    <ArrowBackIosNew />
                </button>
            )}
            <h2 className={`${styles.title} ${hasBackButton === "yes" ? styles.withBackButton : styles.noBackButton}`}>{title}</h2>
        </div>
    );
};

export default TopNav;
