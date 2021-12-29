import React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import store from "../../store/store";
const XLSX = require("xlsx");

const Attendence = () => {
    const handleClick = () => {
        // console.log("deep");
        var today = new Date();
        var date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        const participants = store.getState().participants;
        const host = store.getState().identity;
        console.log(participants);
        let attendence = [];
        participants.forEach((participant) => {
            if (participant.identity !== host) {
                const newObj = {
                    Name: participant.identity,
                    Date: date,
                    Present: "P",
                };
                attendence = [...attendence, newObj];
            }
        });

        let binaryWS = XLSX.utils.json_to_sheet(attendence);

        // Create a new Workbook
        var wb = XLSX.utils.book_new();

        // Name your sheet
        XLSX.utils.book_append_sheet(wb, binaryWS, "Binary values");

        // export your excel
        XLSX.writeFile(wb, `Attendence-${date}.xlsx`);
    };
    return (
        <div className="video_button_container">
            <BorderColorIcon onClick={handleClick} />
        </div>
    );
};

export default Attendence;
