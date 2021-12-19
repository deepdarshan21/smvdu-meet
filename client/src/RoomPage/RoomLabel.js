import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
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
                    text={roomId}
                    onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                            // setDate(dateTime()[1]);
                        }, 5000);
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
