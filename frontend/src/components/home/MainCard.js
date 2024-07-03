import styles from "../../styles/Home/MainCard.module.css"

const MainCard = () => {
    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <p style={{ fontSize: "0.8rem", marginBottom: "2px" }}>TODAY'S EARNINGS</p>
                <div className={styles.topWrapper}>
                    <h3 className={styles.todayEarning}>SGD <span>164.90</span></h3>
                    <p>Last refreshed at 09.40 AM</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <p style={{ fontSize: "0.8rem", marginBottom: "2px", marginTop: "6px" }}>MOST RECENT TRANSACTION</p>
                <h4 className={styles.recentTransc}>TRANSFER FROM PAYLAH: <br />9XXX XXXX</h4>
                <p style={{ fontSize: "0.8rem", marginBottom: 0, marginTop: "6px" }}>3 MINS AGO • 09:38:21 AM</p>
                <h3 className={styles.recentTranscAmt}>SGD <span>5.30</span></h3>
            </div>
        </div>
    );
}

export default MainCard
    ;