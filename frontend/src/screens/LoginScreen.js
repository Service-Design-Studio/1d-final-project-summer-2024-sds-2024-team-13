import styles from "../styles/login/Login.module.css"

const LoginScreen = () => {
    return ( 
        <div className={styles.screen}>
            <h2>DBSBiz</h2>
            <input type="text" placeholder="User ID"/>
            <input type="password" placeholder="Password"/>
            <button className={styles.loginButton}>LOG IN</button>
        </div>
     );
}
 
export default LoginScreen;