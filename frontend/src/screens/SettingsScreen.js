import { AccountCircle, Logout } from "@mui/icons-material";
import styles from "../styles/settings/Settings.module.css"
import { useAuth } from "../context/AuthContext";

const SettingsScreen = () => {
    const { user, logout  } = useAuth();
    return ( 
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>More</h2>
            </div>
            <div className={styles.profile}>
                <AccountCircle className={styles.profileIcon}/>
                <div>
                    <h3>{user.name}</h3>
                    <p>View and Edit Profile</p>
                </div>   
            </div>
            <button onClick={logout} className={styles.logoutButton}>
                <Logout/>
                <p>Log Out</p>
                </button>

        </div>
     );
}
 
export default SettingsScreen;