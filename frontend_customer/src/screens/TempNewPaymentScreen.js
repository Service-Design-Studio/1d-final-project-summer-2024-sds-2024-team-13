import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payment/Payment.css";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const PaymentScreen = () => {
  const navigate = useNavigate();

  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = useCallback((result) => {
    console.log('QR scan success:', result); // Log the QR scan result
    setScannedResult(result?.data);
    
    if (result?.data.includes("DBS")) {
      navigate("/payment/review");
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
  console.log(scannedResult)
  return (
    <div className="qr-reader">
      {/* Add "Scan to Pay" text */}
      <h1 className="scan-to-pay">Scan to Pay</h1>
      {/* QR */}
      <video ref={videoEl} className="video-element"></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="QR Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div>
    </div>
  );
};

export default PaymentScreen;
