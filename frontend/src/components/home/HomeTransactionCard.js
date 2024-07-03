import styles from "../../styles/Home/HomeTransactionCard.module.css"
import paynowIcon from "../../assets/paynowIcon.svg"
import { ChevronRightOutlined } from "@mui/icons-material";

const HomeTransactionCard = ({
    isHighlighted
}) => {
    return ( 
        <div className={`${styles.main} ${(isHighlighted === true) ? styles.mainHighlight: ""}`}>
            <div className={styles.top}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <img src={paynowIcon} style={{marginRight: "0.8rem"}}/>
                    <p style={{margin: 0, fontWeight: 600, fontSize: "0.8rem"}}>TRANSFER FROM PAYLAH: <br/>8XXX XXX</p>
                </div>
                <ChevronRightOutlined/>
            </div>
            <h3 className={styles.amount}>SGD <span>6.50</span></h3>
        </div>
     );
}
 
export default HomeTransactionCard;