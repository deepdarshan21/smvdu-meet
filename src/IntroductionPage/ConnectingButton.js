import React from "react";
import { Button, Stack } from "@mui/material/";

const ConnectingButton = ({ createRoomButton = false, buttonText, onClickHandler }) => {
    const buttonClass = createRoomButton ? "create_room_button" : "join_room_button";
    const buttonVarient = createRoomButton ? "contained" : "outlined";
    
    return (
        // <button className={buttonClass} onClick={onClickHandler}>
        //     {buttonText}
        // </button>
        <Stack spacing={2} direction="row">
            <Button
                variant={buttonVarient}
                // className="button"
                onClick={onClickHandler}
                style={{fontSize: "22px"}}
            >
                {buttonText}
            </Button>
        </Stack>
    );
};

export default ConnectingButton;
