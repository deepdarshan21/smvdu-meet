import React, { useState } from "react";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Time() {
    function dateTime() {
        let date = new Date();
        let hour, min, day, timeType;
        hour = date.getHours();
        if (hour < 12) {
            timeType = "AM";
            if (hour === 0) {
                hour = "12";
            }
        } else {
            timeType = "PM";
            if (hour > 12) {
                hour = hour - 12;
            }
        }
        min = date.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        let final;
        final = `${hour}:${min} ${timeType}`;
        return final;
        // setTime(final)
    }
    const [time, setTime] = useState(dateTime());
    // const [date, setDate] = useState(dateTime()[1]);

    setInterval(() => {
        setTime(dateTime());
        // setDate(dateTime()[1]);
    }, 1000);

    return (
        <div className="date-time">
            <span className="time">{time}</span>
            {/* <span>
                <FiberManualRecordIcon fontSize="small" />
            </span> */}
            {/* <span className="date">{date}</span> */}
        </div>
    );
}

export default Time;
