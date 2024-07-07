import { Link } from "react-router-dom";
import styles from "../styles/login/Login.module.css"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password);
      };

    return (
        <div className={styles.screen}>
            <h2>DBSBiz</h2>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={(e) => {handleSubmit(e)}} className={styles.loginButton}>LOG IN</button>
            <Link to="/register" style={{ color: "#fff" }}><p>Don't have an account? Register here.</p></Link>
        </div>
    );
}

export default LoginScreen;