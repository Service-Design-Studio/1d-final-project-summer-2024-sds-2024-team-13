import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraAlt, ChevronLeft, Image } from '@mui/icons-material';
import CameraIcon from '@mui/icons-material/Camera';
import { Camera } from "react-camera-pro";
import styles from "../../styles/settings/CaptureMenu.module.css";

const CaptureMenu = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [facingMode, setFacingMode] = useState('user'); // Default to 'user'
    const [showCamera, setShowCamera] = useState(false); // State to toggle camera visibility
    const camera = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            setIsMobile(true);
        }
    }, []);

    useEffect(() => {
        if (isMobile) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    const videoTrack = stream.getTracks().find(track => track.kind === 'video');
                    if (videoTrack && videoTrack.getCapabilities) {
                        const capabilities = videoTrack.getCapabilities();
                        if (capabilities.facingMode && capabilities.facingMode.length) {
                            setFacingMode('environment'); // Set to 'environment' if available
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error accessing media devices.', error);
                });
        }
    }, [isMobile]);

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setImageData(file);
        };
        reader.readAsDataURL(file);
    };

    const handleTakePhoto = () => {
        const capturedImage = camera.current.takePhoto();
        setImagePreview(capturedImage);
        setImageData(capturedImage);
        setShowCamera(false);
    };

    const handleOpenCamera = () => {
        setShowCamera(true);
    };

    const handleCloseCamera = () => {
        setShowCamera(false);
    };

    const handleChooseAnotherFile = () => {
        fileInputRef.current.click();
    };

    const handleContinue = () => {
        navigate('/settings/auto-generate', { state: { image: imageData } });
    };

    const handleBack = () => {
        navigate('/settings/menu-preset')
    }

    return (
        <div className={styles.screen}>
            <div className={styles.backWrapper}>
                <button onClick={handleBack} className={styles.backButton}><ChevronLeft sx={{ fontSize: "2.8rem" }} /></button>
            </div>
            <div className={styles.content}>
                <div className={styles.instructions} data-testid="instructions">
                    <h1>Please upload a photo of your stall's menu</h1>
                    <p>Please ensure the names and prices of the menu items are easy to read in your photo.</p>
                </div>
                {imagePreview ? (
                    <>
                        <div className={styles.image_preview}>
                            <img src={imagePreview} alt="Menu Preview" data-testid="image-preview"/>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.camera_button} onClick={handleChooseAnotherFile} data-testid="choose-another-file-button">
                                <Image /> Choose Another File
                            </button>
                            <button className={styles.camera_button} onClick={handleOpenCamera} data-testid="open-camera-button">
                                <CameraAlt /> Open Camera
                            </button>
                            <button className={styles.continue_button} onClick={handleContinue} data-testid="continue-button">
                                Continue
                            </button>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleUploadImage}
                            data-testid="file-browser-input"
                        />
                    </>
                ) : (
                    <>
                        <div className={styles.browseFileButton} data-testid="browse-file-button">
                            <label className={styles.upload_button} data-testid="upload-button">
                                <Image />
                                Browse Files
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    data-testid="file-browser-input"
                                />
                            </label>
                        </div>
                        <p className={styles.label}>or</p>
                        <div className={styles.cameraButton} data-testid="camera-button">
                            <button className={styles.camera_button} onClick={handleOpenCamera} data-testid="open-camera-button">
                                <CameraAlt /> Open Camera
                            </button>
                        </div>
                    </>
                )}
                {showCamera && (
                    <div className={styles.fullScreenCamera}>
                        <Camera ref={camera} aspectRatio={9 / 16} facingMode={facingMode}/>
                        <button className={styles.capture_button} onClick={handleTakePhoto} data-testid="capture-button">
                            <CameraIcon sx={{ fontSize: "3.4rem" }} />
                        </button>
                        <button className={styles.close_button} onClick={handleCloseCamera} data-testid="close-camera-button">
                            <ChevronLeft sx={{ fontSize: "2rem" }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CaptureMenu;
