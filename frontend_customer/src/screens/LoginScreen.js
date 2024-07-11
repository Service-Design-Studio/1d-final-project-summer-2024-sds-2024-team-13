import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(phoneNum, password)
      };

    return (
        <div className={styles.screen}>
            <h2>DBSPay</h2>
            <input type="text" value={phoneNum} onChange={e => setPhoneNum(e.target.value)} placeholder="Phone Number" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={(e) => {handleSubmit(e)}} className={styles.loginButton}>LOG IN</button>
            <Link to="/register" style={{ color: "#fff" }}><p>Don't have an account? Register here.</p></Link>
        </div>
    );
}

export default LoginScreen;