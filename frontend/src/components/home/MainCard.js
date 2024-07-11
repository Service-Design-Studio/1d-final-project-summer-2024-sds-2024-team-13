import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import styles from "../../styles/Home/MainCard.module.css";
import { useState } from "react";

const MainCard = ({ lastRefresh, todayTotal }) => {
    const [showEarnings, setShowEarnings] = useState(true);

    return (
        <div className={styles.main} data-testid="main-card">
            <div className={styles.top}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                    <p style={{ fontSize: "0.8rem", marginTop: "0", marginBottom: "2px" }}>TODAY'S EARNINGS</p>
                    <button
                        className={styles.toggleEarnings}
                        onClick={() => setShowEarnings(!showEarnings)}
                        data-testid="toggle-earnings-button"
                    >
                        {(showEarnings) ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                    </button>
                </div>
                <div className={styles.topWrapper}>
                    <h3 className={styles.todayEarning}>
                        SGD <span data-testid="today-earnings">{(showEarnings) ? todayTotal.toFixed(2) : "--.--"}</span>
                    </h3>
                    <p data-testid="last-refresh">Last refreshed at {lastRefresh || "Loading..."}</p>
                </div>
            </div>
        </div>
    );
};

export default MainCard;
