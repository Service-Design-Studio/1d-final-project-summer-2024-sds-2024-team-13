import { useLocation, useNavigate } from 'react-router-dom'; 
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundDetails.module.css";
import { ErrorOutline } from '@mui/icons-material';

const RefundDetails = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { refund } = location.state || {};


    const handleCancel = () => {
        navigate('/history'); 
    };

    /*const handleResubmit = () => {
        navigate('/refunds/request'); 
    };*/

    const status = refund.status
    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund {status}</div>
                
                {(status === "pending") ? <div className={styles.subtitle}>
                    The refund request is pending action from <br></br>the merchant.
                    </div> :
                (status === "APPROVED") ? <div className={styles.subtitle}>
                    The refund has been approved and processed <br></br>to you.
                    </div> :
                (status === "REJECTED") ? <div className={styles.subtitle}>
                    The refund request has been rejected by <br></br>the merchant.
                    </div> :<></>}
                
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Refund Details</span>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            You will receive
                            </span> :
                        (status === "APPROVED") ? <span className={styles.label}>
                            You received
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            To be paid to
                            </span> :
                        (status === "APPROVED") ? <span className={styles.label}>
                            Paid to
                            </span> :<></>}
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        {(status === "pending" || status === "REJECTED") ? <span className={styles.label}>
                            To be paid by
                            </span> :
                        (status === "APPROVED") ? <span className={styles.label}>
                            Paid by
                            </span> :<></>}
                        <span><b>LAILAICHICKEN</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Last updated</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>18 Jul 2024, 14:51:52 AM</b></span>
                    </div>
                </div>

                {(status === "APPROVED") ? <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Refund Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>REPAYLAH798329781223872</b></span>
                    </div>
                </div> :<></>}

                {(status === "pending" || status === "APPROVED") ? <div className={styles.fullWidthSection}>
                        <div className={styles.section}>
                            <div className={styles.row}>
                                <span className={styles.label}>Expected Payment from You</span>
                            </div>
                            <div className={styles.row}>
                                <span>SGD {parseFloat(refund.expect_amount).toFixed(2)}</span>
                            </div>
                        </div> 
                        <div className={styles.section}>
                            <div className={styles.row}>
                                <span className={styles.label}>Reason(s) for Refund</span>
                            </div>
                            <div className={styles.row}>
                                <span>NIL</span>
                            </div>
                        </div>
                </div> : null}

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span><b>SGD {parseFloat(parseFloat(refund.expect_amount)+parseFloat(refund.refund_amount)).toFixed(2)}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Date and Time</span>
                        <span className={styles.smallValue}>14 JUL 2024, 02:34:19 PM</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Transaction ID</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span className={styles.smallValue}>PAYLAH798329781223872</span>
                    </div>
                </div>

                {status === "REJECTED" ? (
                    <div className={styles.redRow}>
                        <ErrorOutline className={styles.redIcon} />
                        <span className={styles.redLabel}>
                            Please make an attempt to contact the merchant to verify transaction details.
                            <br></br>
                        </span>
                    </div>
                ) :<></>}

                {(status==="pending") ? <button
                    className={styles.Button}
                    onClick={handleCancel}
                >
                    CANCEL REQUEST
                </button> :<></>}

            </div>
        </div>
    );
};

export default RefundDetails;
