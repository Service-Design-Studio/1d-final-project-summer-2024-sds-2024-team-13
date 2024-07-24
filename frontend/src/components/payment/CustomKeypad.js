import React, { useCallback, useEffect, useRef } from 'react';
import styles from '../../styles/payment/CustomKeypad.module.css';

const CustomKeypad = ({ onKeyPress, onEnter, onClose }) => {
    const keypadRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (keypadRef.current && !keypadRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className={styles.keypadContainer} ref={keypadRef} data-testid="keypad">
            <div className={styles.keypadRow}>
                <button onClick={() => onKeyPress('1')}>1</button>
                <button onClick={() => onKeyPress('2')}>2</button>
                <button onClick={() => onKeyPress('3')}>3</button>
            </div>
            <div className={styles.keypadRow}>
                <button onClick={() => onKeyPress('4')}>4</button>
                <button onClick={() => onKeyPress('5')}>5</button>
                <button onClick={() => onKeyPress('6')}>6</button>
            </div>
            <div className={styles.keypadRow}>
                <button onClick={() => onKeyPress('7')}>7</button>
                <button onClick={() => onKeyPress('8')}>8</button>
                <button onClick={() => onKeyPress('9')}>9</button>
            </div>
            <div className={styles.keypadRow}>
                <button onClick={() => onKeyPress('.')}>.</button>
                <button onClick={() => onKeyPress('0')}>0</button>
                <button onClick={() => onKeyPress('C')}>x</button>
            </div>
            <div className={styles.keypadRow}>
                <button className={styles.enterButton} onClick={onEnter} data-testid="arrow-icon">✔</button>
            </div>
        </div>
    );
};

export default CustomKeypad;
