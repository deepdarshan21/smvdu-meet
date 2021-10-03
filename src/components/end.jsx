import React from 'react';

export default function End(){
    return (
        <div className="end-call">
            <h2>You left the meeting</h2>
            <button>Return to Home Screen</button>
            <button>Submit feedback</button>
            <div className="safe-meet">
                <h4>Your Meeting is Safe</h4>
                <p>No one can join the meet unless invited or admitted by the the host</p>
                <a href="">Learn more</a>
            </div>
        </div>
    )
}