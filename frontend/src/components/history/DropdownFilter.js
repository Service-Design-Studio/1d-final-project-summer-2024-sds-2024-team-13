import { useState } from 'react';
import { ArrowDropDown, CalendarToday } from "@mui/icons-material";
import styles from "../../styles/history/DropdownFilter.module.css"
import Popup from 'reactjs-popup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DropdownFilter = ({
    filterOption,
    setFilterOption,
    startDate, 
    setStartDate,
    endDate, 
    setEndDate
}) => {
    const [open, setOpen] = useState(false);
    const [tempStart, setTempStart] = useState(null);
    const [tempEnd, setTempEnd] = useState(null);

    const closeModal = () => {
        setOpen(false)
        setSelectedOption("")
        setErrorMessage("")
        setTempStart(null)
        setTempEnd(null)
    };

    function formatDate(date) {
        if (!date) return '';
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear().toString().slice(-2);
    
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
    
        return `${month}/${day}/${year}`;
    }
    
    const [selectedOption, setSelectedOption] = useState("") 
    
    const [errorMessage, setErrorMessage] = useState("");

    const handleNonRange = (selected) => {
        setSelectedOption(selected)
        setTempStart(null)
        setTempEnd(null)
    }

    const handleApplyFilter = () => {
        if (selectedOption === "") {
            setErrorMessage("Please select a filter")
            
        } else if (selectedOption === "custom" && tempStart === null) {
            setErrorMessage("Please choose a start date")
        } else if (selectedOption === "custom" && tempEnd === null) {
            setErrorMessage("Please choose an end date")

        } else {
            if (selectedOption === "custom") {
                setStartDate(tempStart);
                setEndDate(tempEnd);
            }
            setFilterOption(selectedOption)
            closeModal();
        }
    }
    

    return (
        <Popup
            onOpen={() => setOpen(true)}
            open={open}
            closeOnDocumentClick
            onClose={closeModal}
            trigger={
                <div className={`${styles.main} ${(open === true) ? styles.main_selected : ""}`}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday />
                        <p style={{ marginLeft: "8px" }}>
                            {(filterOption === "thismonth") ? "This Month" : ""}
                            {(filterOption === "lastmonth") ? "Last Month" : ""}
                            {(filterOption === "today") ? "Today" : ""}
                            {(filterOption === "yesterday") ? "Yesterday" : ""}
                            {(filterOption === "custom") ? `${formatDate(startDate)} - ${formatDate(endDate)}` : ""}


                            </p>
                    </div>
                    <ArrowDropDown />
                </div>
            }

        >
            <div className={styles.modal}>
                <div className={styles.rangeContainer}>
                    <div className={styles.rangeContainerChild}>
                        <p>From</p>
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            onFocus={(e) => e.target.readOnly = true}
                            placeholderText="Select Date"
                            selected={tempStart}
                            className={styles.datePicker}
                            onChange={(date) => {
                                setTempStart(date)
                                setSelectedOption("custom")
                            }
                            } />
                    </div>
                    <div className={styles.rangeContainerChild}>
                        <p>To</p>
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            onFocus={(e) => e.target.readOnly = true}
                            placeholderText="Select Date"
                            selected={tempEnd}
                            className={styles.datePicker}
                            onChange={(date) => {
                                setTempEnd(date)
                                setSelectedOption("custom")
                                }} />
                    </div>
                </div>
                <button className={`${styles.optionButton} ${(selectedOption === "today") ? styles.selectedOptionButton : ""}`} onClick={() => handleNonRange("today")}>Today</button>
                <button className={`${styles.optionButton} ${(selectedOption === "yesterday") ? styles.selectedOptionButton : ""}`} onClick={() => handleNonRange("yesterday")}>Yesterday</button>
                <button className={`${styles.optionButton} ${(selectedOption === "thismonth") ? styles.selectedOptionButton : ""}`} onClick={() => handleNonRange("thismonth")}>This Month</button>
                <button className={`${styles.optionButton} ${(selectedOption === "lastmonth") ? styles.selectedOptionButton : ""}`} onClick={() => handleNonRange("lastmonth")}>Last Month</button>
                <button className={styles.confirmButton} onClick={() => handleApplyFilter()}>Apply Filter</button>
                <p className={styles.error}>{errorMessage}</p>               
            </div>
        </Popup>


    );
}



export default DropdownFilter;