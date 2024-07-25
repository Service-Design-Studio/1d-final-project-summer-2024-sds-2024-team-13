import RefundScreenNav from './RefundScreenNav';
import styles from "../../styles/refunds/RefundScreen.module.css";
import { useState } from 'react';

const RefundScreen = () => {
    const [value, setValue] = useState(0)
    
    return (
        <div className={styles.screen}>
            <RefundScreenNav {...{setValue, value}} />
            <div className={styles.content}>
                
            </div>
        </div>
    );
};

export default RefundScreen;
