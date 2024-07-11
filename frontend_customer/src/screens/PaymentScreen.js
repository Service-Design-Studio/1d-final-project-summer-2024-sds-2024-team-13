import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/payment/Payment.module.css"
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const PaymentScreen = () => {
  const navigate = useNavigate();

  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);

  const onScanSuccess = useCallback((result) => {
    console.log('QR scan success:', result); // Log the QR scan result

    const data = JSON.parse(result?.data)
    if (data.type === "DBSBizQR") { 
      console.log("Redirecting to /payment/review");
      navigate("/payment/review", { state: { data } });
    }
  }, [navigate]);

  const onScanFail = (err) => {
    console.log('QR scan error:', err);
  };

  useEffect(() => {
    const currentVideoEl = videoEl.current;
    if (currentVideoEl && !scanner.current) {
      scanner.current = new QrScanner(currentVideoEl, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (currentVideoEl) {
        scanner.current?.stop();
      }
    };
  }, [onScanSuccess]);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and reload."
      );
  }, [qrOn]);
  return (
    <div className={styles.qr_reader}>
      <div className={styles.header}>
        <h1 className={styles.scan_to_pay}>Scan to Pay</h1>
      </div>
      <video ref={videoEl} className={styles.video_element}></video>
      <div ref={qrBoxEl} className={styles.qr_box}>
        <img
          src={QrFrame}
          alt="QR Frame"
          width={256}
          height={256}
          className={styles.qr_frame}
        />
      </div>
      <div className={styles.footer}>
        <h3>Scan QR Code</h3>
        <p>Align camera with QR code to pay in SG, CN, MY, TH and other countries worldwide.</p>
        <a href="https://www.dbs.com.sg/personal/deposits/pay-with-ease/scan-and-pay" target="_blank" rel="noreferrer">See full list of support QR codes</a>
      </div>
    </div>
  );
};

export default PaymentScreen;
