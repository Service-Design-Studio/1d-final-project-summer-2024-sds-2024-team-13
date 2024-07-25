import { useLocation } from 'react-router-dom'; 
import RefundDetailsNav from './RefundDetailsNav';
import styles from "../../styles/refunds/RefundDetails.module.css";
import { ErrorOutline } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const RefundDetails = () => {
    const location = useLocation();
    const { refund } = location.state || {};
    const { user } = useAuth();

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund {refund.status}</div>
                
                {(refund.status === "pending") ? <div className={styles.subtitle}>
                    The refund request is pending action from the customer.
                    </div> :
                (refund.status === "APPROVED") ? <div className={styles.subtitle}>
                    The refund has been approved and processed to the customer.
                    </div> :
                (refund.status === "REJECTED") ? <div className={styles.subtitle}>
                    The refund request has been rejected by the customer.
                    </div> :<></>}
                
                <div className={styles.sectionTitle}>
                    <span className={styles.paymentTitle}>Refund Details</span>
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(refund.status === "pending" || refund.status === "REJECTED") ? <span className={styles.label}>
                            Customer will receive
                            </span> :
                        (refund.status === "APPROVED") ? <span className={styles.label}>
                            Customer received
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        <span className={styles.amount}>SGD {parseFloat(refund.refund_amount).toFixed(2)}</span>
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(refund.status === "pending" || refund.status === "REJECED") ? <span className={styles.label}>
                            To be paid to
                            </span> :
                        (refund.status === "APPROVED") ? <span className={styles.label}>
                            Paid to
                            </span> :<></>}
                        <span><b>9XXX XXXX</b></span>
                    </div>
                    <div className={styles.row}>
                        {(refund.status === "pending" || refund.status === "REJECTED") ? <span className={styles.label}>
                            To be paid by
                            </span> :
                        (refund.status === "APPROVED") ? <span className={styles.label}>
                            Paid by
                            </span> :<></>}
                        <span><b>{user.name}</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Last updated</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span><b>18 Jul 2024, 14:51:52 AM</b></span>
                    </div>
                </div>

                {(refund.status === "APPROVED") ? <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Refund Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>REPAYLAH18296309271973212</b></span>
                    </div>
                </div> :<></>}

                <div className={styles.fullWidthSection}>
                    {(refund.status === "pending" || refund.status === "APPROVED") ? (<>
                        <div className={styles.section}>
                            <div className={styles.row}>
                                <span className={styles.label}>Expected Payment from Customer</span>
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
                    </>) : null}

                    {(refund.status==="REJECTED") ? <div className={styles.section}>               
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) from Customer</span>
                        </div>
                        <div className={styles.row}>
                            <span>I actually bought 100 packets of wanton mee</span>
                        </div>
                    </div> :<></>}
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Original Payment</span>
                        <span><b>SGD 530.00</b></span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Date and Time</span>
                        <span className={styles.smallValue}>17 JUL 24, 09:41:21 AM</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.smallLabel}>Transaction ID</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        <span className={styles.smallValue}>PAYLAH18296309271973212</span>
                    </div>
                </div>

                {refund.status === "REJECTED" ? (
                    <div className={styles.redRow}>
                        <ErrorOutline className={styles.redIcon} />
                        <span className={styles.redLabel}>
                            Please contact the customer at the given phone number to verify transaction details.
                            <br></br>
                            Resubmit the refund request only if the transaction is confirmed as erroneous.
                        </span>
                    </div>
                ) :<></>}

                

            </div>
        </div>
    );
};

export default RefundDetails;
