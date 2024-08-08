import styles from "../../styles/history/Insights.module.css"
import WeeklyHoursChart from "./WeeklyHoursChart";
import YearlyMonthsChart from "./YearlyMonthsChart";
import TopHead from "../TopHead";
import Carousel from 'react-material-ui-carousel'
import DailyEarningsChart from "./DailyEarningsChart";
const Insights = () => {
    return (
        <div className={styles.main}>
            <TopHead title="Transactions" />
            <Carousel autoPlay={false} height={200} animation="slide" navButtonsAlwaysVisible swipe
                navButtonsProps={{
                    style: {
                        background: "none",
                        paddingInline: "2px"
                    }
                }}
                indicatorIconButtonProps={{
                    style: {
                        scale: "0.8"
                    }
                }}
            >
                
                <DailyEarningsChart />
                <WeeklyHoursChart />
                <YearlyMonthsChart />
            </Carousel>


        </div>
    );
}

export default Insights;