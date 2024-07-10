import { AccountCircle, ChevronRight, Logout, WbSunny } from "@mui/icons-material";
import styles from "../styles/settings/Settings.module.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SettingsScreen = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>More</h2>
            </div>
            <div className={styles.profile}>
                <AccountCircle className={styles.profileIcon} />
                <div>
                    <h3>{user.name}</h3>
                    <p>View and Edit Profile</p>
                </div>
            </div>
            <button onClick={()=>navigate("/settings/cutoff")} className={styles.settingsButton}>
                <div className={styles.settingsLabel}>
                    <WbSunny />
                    <p>Set Daily Cutoff</p>
                </div>
                <ChevronRight/>

            </button>
            <button onClick={logout} className={styles.logoutButton}>
                <Logout />
                <p>Log Out</p>
            </button>

        </div>
    );
}

export default SettingsScreen;