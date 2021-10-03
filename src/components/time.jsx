import React, { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Time() {
    function dateTime() {
        let date = new Date();
        let hour, min, day, displayDate, timeType;
        hour = date.getHours();
        if (hour < 12) {
            timeType = "AM";
            if(hour===0){
                hour="12";
            }
        } else {
            timeType = "PM";
            if(hour>12){
                hour=hour-12;
            }
        }
        min = date.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        displayDate = "";
        date = date.toString();
        day = date.slice(0, 3);
        for (var i = 4; i < 10; i++) {
            displayDate += date[i];
        }
        let final = new Array(2);
        final[0] = `${hour}:${min} ${timeType}`;
        final[1] = `${day}, ${displayDate}`;
        return final;
        // setTime(final)
    }
    const [time, setTime] = useState(dateTime()[0]);
    const [date, setDate] = useState(dateTime()[1]);

    setInterval(() => {
        setTime(dateTime()[0]);
        setDate(dateTime()[1]);
    }, 1000);

    return (
        <div className="date-time">
            <span className="time">{time}</span>
            <span>
                <FiberManualRecordIcon fontSize="small" />
            </span>
            <span className="date">{date}</span>
        </div>
    );
}

export default Time;
