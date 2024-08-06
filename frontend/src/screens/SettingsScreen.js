import { Settings, AccountCircle, RestaurantMenu, SupportAgent, ChevronRight, Logout, WbSunny } from "@mui/icons-material";
import styles from "../styles/settings/Settings.module.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SettingsScreen = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>More</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <AccountCircle className={styles.profileIcon} />
                    <div>
                        <h3>{user.name}</h3>
                        <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>View and Edit Profile</p>
                        </Link>
                    </div>
                </div>
                <button onClick={()=>navigate("/settings")} className={styles.settingsButton}>
                    <div className={styles.settingsLabel}>
                        <Settings />
                        <p>Settings</p>
                    </div>
                    <ChevronRight/>
                </button>
                <button onClick={()=>navigate("/settings/cutoff")} className={styles.settingsButton}>
                    <div className={styles.settingsLabel}>
                        <WbSunny />
                        <p>Set Daily Cutoff</p>
                    </div>
                    <ChevronRight/>
                </button>
                <button onClick={()=>navigate("/settings/menu-preset")} className={styles.settingsButton}>
                    <div className={styles.settingsLabel}>
                        <RestaurantMenu />
                        <p>Menu Preset</p>
                    </div>
                    <ChevronRight/>
                </button>
                <button onClick={()=>navigate("/settings")} className={styles.settingsButton}>
                    <div className={styles.settingsLabel}>
                        <SupportAgent />
                        <p>Help & Support</p>
                    </div>
                    <ChevronRight/>
                </button>
                <button onClick={logout} className={styles.logoutButton}>
                    <div className={styles.settingsLabel}>
                        <Logout />
                        <p>Log Out</p>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default SettingsScreen;