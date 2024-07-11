import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import { useState } from "react";
import axiosInstance from "../utils/axiosConfig";


const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();  
        try {
            const userParams = {
                customer: {
                    name: name,
                    phone_num: phoneNum,
                    password: password
                }
            };
            const response = await axiosInstance.post('/customers', userParams);
            console.log('Customer registered:', response.data);
            navigate('/'); 
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className={styles.screen}>
            <h2>Create An Account</h2>
            <form onSubmit={handleRegister}>
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input required type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} placeholder="Phone Number" />
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" className={styles.registerButton}>REGISTER</button>
            </form>
            <Link to="/" style={{ color: "#fff" }}><p>Already have an account? Login here</p></Link>
        </div>
    );
};

export default RegisterScreen;
