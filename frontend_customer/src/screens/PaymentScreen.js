import { useEffect, useRef, useState } from "react";
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

  const onScanSuccess = (result) => {
    console.log('QR scan success:', result); // Log the result for debugging
    setScannedResult(result?.data);

    // Redirect based on the scanned result
    if (result?.data.includes("DBS")) { // FOR TESTING QR CODES
      console.log("Redirecting to /payment/review"); // Debugging log
      navigate("/payment/review");
    }
  };

  const onScanFail = (err) => {
    console.log('QR scan error:', err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and reload."
      );
  }, [qrOn]);

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
