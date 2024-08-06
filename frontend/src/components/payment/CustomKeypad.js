import React, { useCallback, useEffect, useRef } from 'react';
import styles from '../../styles/payment/CustomKeypad.module.css';
import { Backspace } from '@mui/icons-material';

const CustomKeypad = ({ amount, onKeyPress, onClose }) => {
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

    const disableDotButton = amount.length >= 5 || amount.includes('.');
    const disableStartButton = amount === '0' || amount.length === 0;

    return (
        <div className={styles.keypadContainer} ref={keypadRef} data-testid="keypad">
            <div className={`${styles.keypadColumn} ${styles.flex3Element}`}>
                <div className={styles.keypadRow}>
                    <button
                        onClick={() => onKeyPress('Clear')}
                        className={`${styles.button}`}
                        style={{ fontSize: '1.3rem', backgroundColor: '#FDB3A6', color: '#ffff' }}
                    >
                        C
                    </button>
                    <button
                        onClick={() => onKeyPress('/')}
                        className={styles.button}
                        style={{ fontSize: '1.3rem', backgroundColor: '#F9DAD8' }}
                        disabled={disableStartButton}
                        data-testid="slash"
                    >
                        /
                    </button>
                    <button
                        onClick={() => onKeyPress('*')}
                        className={styles.button}
                        style={{ fontSize: '1.3rem', backgroundColor: '#F9DAD8' }}
                        disabled={disableStartButton}
                        data-testid="asterisk"
                    >
                        *
                    </button>
                    <button
                        onClick={() => onKeyPress('-')}
                        className={styles.button}
                        style={{ fontSize: '1.3rem', backgroundColor: '#F9DAD8' }}
                        disabled={disableStartButton}
                        data-testid="dash"
                    >
                        -
                    </button>
                </div>
                <div className={styles.keypadRow}>
                    <button onClick={() => onKeyPress('7')} className={styles.button}>7</button>
                    <button onClick={() => onKeyPress('8')} className={styles.button}>8</button>
                    <button onClick={() => onKeyPress('9')} className={styles.button}>9</button>
                    <button
                        onClick={() => onKeyPress('+')}
                        className={styles.button}
                        style={{ fontSize: '1.3rem', backgroundColor: '#F9DAD8' }}
                        disabled={disableStartButton}
                        data-testid="plus"
                    >
                        +
                    </button>
                </div>
                <div className={styles.keypadRow}>
                    <button onClick={() => onKeyPress('4')} className={styles.button}>4</button>
                    <button onClick={() => onKeyPress('5')} className={styles.button}>5</button>
                    <button onClick={() => onKeyPress('6')} className={styles.button}>6</button>
                    <button
                        onClick={() => onKeyPress('Backspace')}
                        className={styles.button}
                        style={{ fontSize: '1.3rem', backgroundColor: '#F9DAD8' }}
                        data-testid="backspace"
                    >
                        <Backspace />
                    </button>
                </div>
            </div>
            <div className={`${styles.keypadColumn} ${styles.flex2Element}`}>
                <div className={styles.keypadRow}>
                    <div className={`${styles.keypadColumn} ${styles.flex3Element}`}>  
                        <div className={styles.keypadRow}>
                            <button onClick={() => onKeyPress('1')} className={styles.button}>1</button>
                            <button onClick={() => onKeyPress('2')} className={styles.button}>2</button>
                            <button onClick={() => onKeyPress('3')} className={styles.button}>3</button>
                        </div>
                        <div className={styles.keypadRow}>
                            <div className={`${styles.flex2Element}`}>
                                <button onClick={() => onKeyPress('0')} className={styles.zeroButton}>0</button>
                            </div>
                            <div className={`${styles.flex1Element}`}>
                                <button
                                    onClick={() => onKeyPress('.')}
                                    className={`${styles.button} ${disableDotButton ? styles.disabledButton : ''}`}
                                    disabled={disableDotButton}
                                    data-testid="dot"
                                >
                                    .
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.keypadColumn} ${styles.flex1Element}`}>
                        <button
                            onClick={() => onKeyPress('=')}
                            className={styles.equalButton}
                            data-testid="equal-button"
                        >
                            =
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomKeypad;
