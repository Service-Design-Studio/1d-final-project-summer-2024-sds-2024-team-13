import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import styles from "../../styles/Home/MainCard.module.css";
import { useState } from "react";

const MainCard = ({ lastRefresh, todayTotal }) => {
  const [showEarnings, setShowEarnings] = useState(true);

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
          <p style={{ fontSize: "0.8rem", marginTop: "0", marginBottom: "2px" }}>TODAY'S EARNINGS</p>
          <button
            className={styles.toggleEarnings}
            onClick={() => setShowEarnings(!showEarnings)}
            data-testid="toggle-earnings-button"
          >
            {showEarnings ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </button>
        </div>
        <div className={styles.topWrapper}>
          <h3 className={styles.todayEarning}>
            SGD <span data-testid="today-earnings">{showEarnings ? todayTotal.toFixed(2) : "--.--"}</span>
          </h3>
          <p>Last refreshed at {lastRefresh || "Loading..."}</p>
        </div>
      </div>
      {/* <div className={styles.bottom}>
        <p style={{ fontSize: "0.8rem", marginBottom: "2px", marginTop: "6px" }}>MOST RECENT TRANSACTION</p>
        <h4 className={styles.recentTransc}>TRANSFER FROM PAYLAH: <br />9XXX XXXX</h4>
        <p style={{ fontSize: "0.8rem", marginBottom: 0, marginTop: "6px" }}>3 MINS AGO • 09:38:21 AM</p>
        <h3 className={styles.recentTranscAmt}>SGD <span>5.30</span></h3>
      </div> */}
    </div>
  );
};

export default MainCard;
