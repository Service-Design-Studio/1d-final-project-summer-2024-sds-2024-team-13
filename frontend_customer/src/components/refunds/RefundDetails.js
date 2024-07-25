import { useNavigate } from 'react-router-dom'; 
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundDetails.module.css";
import { useState } from 'react';
import { ErrorOutline } from '@mui/icons-material';

const RefundDetails = () => {
    const navigate = useNavigate(); 

    const handleCancel = () => {
        navigate('/history'); 
    };

    const handleResubmit = () => {
        navigate('/refunds/request'); 
    };

    const [status, setStatus] = useState('Rejected'); // Thanks rachel, remember to correct this logic

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund {status}</div>
                
                {(status === "Pending") ? <div className={styles.subtitle}>
                    The refund request is pending action from <br></br>the merchant.
                    </div> :
                (status === "Approved") ? <div className={styles.subtitle}>
                    The refund has been approved and processed <br></br>to you.
                    </div> :
                (status === "Rejected") ? <div className={styles.subtitle}>
                    The refund request has been rejected by <br></br>the merchant.
                    </div> :<></>}
                
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Refund Details</span>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "Pending" || status === "Rejected") ? <span className={styles.label}>
                            You will receive
                            </span> :
                        (status === "Approved") ? <span className={styles.label}>
                            You received
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD 32.40</span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "Pending" || status === "Rejected") ? <span className={styles.label}>
                            To be paid to
                            </span> :
                        (status === "Approved") ? <span className={styles.label}>
                            Paid to
                            </span> :<></>}
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        {(status === "Pending" || status === "Rejected") ? <span className={styles.label}>
                            To be paid by
                            </span> :
                        (status === "Approved") ? <span className={styles.label}>
                            Paid by
                            </span> :<></>}
                        <span><b>Lai Lai Wanton Mee</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Last updated</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>18 Jul 2024, 14:51:52 AM</b></span>
                    </div>
                </div>

                {(status === "Approved") ? <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Refund Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>REPAYLAH798329781223872</b></span>
                    </div>
                </div> :<></>}

                {(status === "Pending" || status === "Approved") ? <div className={styles.fullWidthSection}>
                        <div className={styles.section}>
                            <div className={styles.row}>
                                <span className={styles.label}>Expected Payment from You</span>
                            </div>
                            <div className={styles.row}>
                                <span>SGD 3.60</span>
                            </div>
                        </div> 
                        <div className={styles.section}>
                            <div className={styles.row}>
                                <span className={styles.label}>Reason(s) for Refund</span>
                            </div>
                            <div className={styles.row}>
                                <span>amount is supposed to be 3.60</span>
                            </div>
                        </div>
                </div> : null}

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span><b>SGD 36.00</b></span>
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

                {status === "Rejected" ? (
                    <div className={styles.redRow}>
                        <ErrorOutline className={styles.redIcon} />
                        <span className={styles.redLabel}>
                            Please make an attempt to contact the merchant to verify transaction details.
                            <br></br>
                            Resubmit the refund request only if the transaction is confirmed as erroneous.
                        </span>
                    </div>
                ) :<></>}

                {(status==="Pending") ? <button
                    className={styles.Button}
                    onClick={handleCancel}
                >
                    CANCEL REQUEST
                </button> :
                (status==="Rejected") ? <button
                    className={styles.Button}
                    onClick={handleResubmit}
                >
                    RESUBMIT REQUEST
                </button> :<></>}

            </div>
        </div>
    );
};

export default RefundDetails;
