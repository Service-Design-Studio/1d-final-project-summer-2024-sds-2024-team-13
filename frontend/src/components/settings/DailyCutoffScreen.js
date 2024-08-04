import { AccessTime } from "@mui/icons-material";
import styles from "../../styles/settings/DailyCutoff.module.css"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import TopNav from '../TopNav';

const DailyCutoffScreen = () => {
    const { user } = useAuth();

    const [cutoffTime, setCutoffTime] = useState(dayjs().hour(0).minute(0).second(0).millisecond(0)); const fetchCutoffTime = useCallback(async () => {
        if (user) {
            try {
                const response = await axiosInstance.get(`/users/${user.user_id}/earnings_cutoff`);
                setCutoffTime(dayjs(response.data.earnings_cutoff_time));
            } catch (error) {
                console.error('Failed to fetch earnings cutoff time:', error);
            }
        }
    }, [user]);

    const updateCutoffTime = useCallback(async (newCutoffTime) => {
        if (!user) return;

        try {
            const localTime = dayjs(newCutoffTime, { timeZone: 'local' });  


            console.log("Local time picked: " + localTime.format());

            await axiosInstance.put(`/users/${user.user_id}/earnings_cutoff`, {
                user: { earnings_cutoff_time: localTime }
            });
        } catch (error) {
            console.error('Failed to update earnings cutoff time:', error);
        }
    }, [user]);



    useEffect(() => {

        fetchCutoffTime();
    }, [fetchCutoffTime]);

    return (
        <div>
            <TopNav
                title="Set Daily Cutoff"
                pathname="/settings"
                hasBackButton="yes"
            />
            <div className={styles.screen}>
                <div className={styles.option}>
                    <div style={{ "display": "flex", "alignItems": "center", "gap": "12px" }}>
                        <AccessTime />
                        <p>Store Closes At</p>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                            value={dayjs(cutoffTime)}
                            onChange={(newValue) => {
                                const localISOTime = newValue.toISOString();
                                setCutoffTime(localISOTime);
                                updateCutoffTime(localISOTime);
                            }}
                            className={styles.timePicker} />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}

export default DailyCutoffScreen;