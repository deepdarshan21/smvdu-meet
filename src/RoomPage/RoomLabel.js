import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const RoomLabel = ({ roomId }) => {
    const [copied, setCopied] = useState(false);
    // setInterval(() => {
    //     setCopied(false);
    //     // setDate(dateTime()[1]);
    // }, 5000);
    return (
        <div className="room_label">
            <p className="room_label_paragraph">
                ID : {roomId}
                <CopyToClipboard
                    // options={{ debug: props.debug, message: "" }}
                    className="copy-clipboard"
                    text={roomId}
                    onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                            // setDate(dateTime()[1]);
                        }, 1500);
                    }}
                >
                    <span> {copied ? "Copied" : "Copy"}</span>
                    {/* <ContentCopyIcon /> */}
                </CopyToClipboard>
            </p>
        </div>
    );
};

export default RoomLabel;
