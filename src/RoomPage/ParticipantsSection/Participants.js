import React from 'react';
import {connect} from "react-redux";


const SingleParticipant = (props) => {

    const {identity , lastItem ,participant} = props;

    return <>
        <p className='participants_paragraph' >{identity}</p>
        {!lastItem && <span className='participants_separator_line'></span>}
    </>
};

const Participants = ({participants}) => {
    return (
        <div className='participants_container'>
            {participants.map((participant , index) => {
                return (
                    <SingleParticipant 
                        key = {index}
                        identity = {participant.identity}
                        lastItem = {participants.length === index+1}
                        participant = {participant}
                    />
                );
            })}
        </div>
    )
}

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(mapStoreStateToProps)(Participants);

