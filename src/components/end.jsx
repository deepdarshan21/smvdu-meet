import React from 'react';
import { Link } from "react-router-dom";

export default function End(){
    return (
        <div className="end-call-page">
            <h2>You left the meeting</h2>
            <Link to="/">
                <button>Return to Home Screen</button>
            </Link>
            <button>Submit feedback</button>
            <div className="safe-meet">
                <h4>Your Meeting is Safe</h4>
                <p>No one can join the meet unless invited or admitted by the the host</p>
                <a href="">Learn more</a>
            </div>
        </div>
    );
}