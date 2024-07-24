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

    const [status, setStatus] = useState('Approved');

    return (
        <div className={styles.screen}>
            <RefundDetailsNav />
            <div className={styles.content}>
                <div className={styles.title}>Refund {status}</div>
                
                {(status === "Pending") ? <div className={styles.subtitle}>
                    The refund request is pending action from the customer.
                    </div> :
                (status === "Approved") ? <div className={styles.subtitle}>
                    The refund has been approved and processed to the customer.
                    </div> :
                (status === "Rejected") ? <div className={styles.subtitle}>
                    The refund request has been rejected by the customer.
                    </div> :<></>}
                
                <div className={styles.sectionTitle}>
                    {(status === "Pending" || status === "Rejected") ? <span className={styles.paymentTitle}>
                        Payment Details
                        </span> :
                    (status === "Approved") ? <span className={styles.paymentTitle}>
                        Refund Details
                        </span> :<></>}
                </div>

                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        {(status === "Pending" || status === "Rejected") ? <span className={styles.label}>
                            Customer paid
                            </span> :
                        (status === "Approved") ? <span className={styles.label}>
                            Customer received
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span></span>
                        {(status === "Pending" || status === "Rejected") ? <span className={styles.amount}>
                            SGD 530.00
                            </span> :
                        (status === "Approved") ? <span className={styles.amount}>
                            SGD 524.70
                            </span> :<></>} 
                    </div>
                </div>
                
                <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid to</span>
                        {(status === "Pending" || status === "Rejected") ? <span>
                            <b>Lai Lai Wanton Mee</b>
                            </span> :
                        (status === "Approved") ? <span>
                            <b>9XXX XXXX</b>
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Paid by</span>
                        {(status === "Pending" || status === "Rejected") ? <span>
                            <b>9XXX XXXX</b>
                            </span> :
                        (status === "Approved") ? <span>
                            <b>Lai Lai Wanton Mee</b>
                            </span> :<></>}
                    </div>
                    <div className={styles.row}>
                        <span className={styles.label}>Date and Time</span>
                        <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                        {(status === "Pending" || status === "Rejected") ? <span>
                            <b>17 Jul 2024, 09:41:21 AM</b>
                            </span> :
                        (status === "Approved") ? <span>
                            <b>18 Jul 2024, 14:51:52 AM</b>
                            </span> :<></>}
                    </div>
                </div>
                {(status === "Pending" || status === "Rejected") ? <div className={styles.fullWidthSection}>
                    <div className={styles.row}>
                        <span className={styles.label}>Transaction ID</span>
                    </div>
                    <div className={styles.row}>
                        <span><b>PAYLAH18296309271973212</b></span>
                    </div>
                </div> :
                <div className={styles.fullWidthSection}>
                <div className={styles.row}>
                    <span className={styles.label}>Refund Transaction ID</span>
                </div>
                <div className={styles.row}>
                    <span><b>REPAYLAH18296309271973212</b></span>
                </div>
            </div>
                }
   

                <div className={styles.fullWidthSection}>
                    {(status==="Pending") ? <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Expected Payment from Customer</span>
                        </div>
                        <div className={styles.row}>
                            <span>SGD 5.30</span>
                        </div>
                    </div> :<></>}
                    {(status==="Pending" || status === "Approved") ? <div className={styles.section}>
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s) for Refund</span>
                        </div>
                        <div className={styles.row}>
                            <span>Customer supposed to pay 5.30 so I refund him</span>
                        </div>
                    </div> :<></>}
                    {(status==="Rejected") ? <div className={styles.section}>               
                        <div className={styles.row}>
                            <span className={styles.label}>Reason(s)</span>
                        </div>
                        <div className={styles.row}>
                            <span>I actually bought 100 packets of wanton mee</span>
                        </div>
                    </div> :<></>}
                </div>

                {(status==="Approved") ? <div className={styles.fullWidthSection}>
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
                </div> :<></>}

                {status === "Rejected" ? (
                    <div className={styles.redRow}>
                        <ErrorOutline className={styles.redIcon} />
                        <span className={styles.redLabel}>
                            Please contact the customer at the given phone number to verify transaction details.
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
