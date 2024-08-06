import React from 'react';
import styles from "../styles/TopHead.module.css";

const TopHead = ({ title }) => {
    return (
        <div className={styles.main}>
            <h2 className={styles.title}>{title}</h2>
        </div>
    );
};

export default TopHead;
