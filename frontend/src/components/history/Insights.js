import { Box } from "@mui/material";
import styles from "../../styles/history/Insights.module.css";
import WeeklyHoursChart from "./WeeklyHoursChart";
import YearlyMonthsChart from "./YearlyMonthsChart";

const Insights = () => {
    return (
        <div className={styles.main} data-testid="insights">
            <h2 className={styles.title}>Transactions</h2>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    py: 1,
                    height: "100%",
                    overflow: "auto",
                    scrollSnapType: 'x mandatory',
                    '& > *': {
                        scrollSnapAlign: 'center',
                    },
                    '::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: "none" 
                }}
            >
                <WeeklyHoursChart />
                <YearlyMonthsChart />
            </Box>
        </div>
    );
}

export default Insights;
