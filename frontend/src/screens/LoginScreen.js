import { Link } from "react-router-dom";
import styles from "../styles/login/Login.module.css"

const LoginScreen = () => {
    return ( 
        <div className={styles.screen}>
            <h2>DBSBiz</h2>
            <input type="text" placeholder="User ID"/>
            <input type="password" placeholder="Password"/>
            <Link to="/home"><button className={styles.loginButton}>LOG IN</button></Link>
        </div>
     );
}
 
export default LoginScreen;