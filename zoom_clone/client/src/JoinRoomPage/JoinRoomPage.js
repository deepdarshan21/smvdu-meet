import {useEffect , React} from 'react';
import {useLocation} from "react-router-dom";
import "./JoinRoomPage.css";
import {connect} from "react-redux";
import { setIsRoomHost } from '../store/actions';
import JoinRoomPageTitle from './JoinRoomPageTitle';
import JoinRoomContent from './JoinRoomContent';

const JoinRoomPage = (props) => {

    const {setIsRoomHostAction  , isRoomHost} = props;

    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get('host');

        if(isRoomHost){
               setIsRoomHostAction(true);
        }
    } , [] );

    return (
        <div className='join_room_page_container'>
            <div className='join_room_page_panel' >
                <JoinRoomPageTitle isRoomHost={isRoomHost}/>
                <JoinRoomContent />
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state 
    }
};

const mapActionsToProps = (dispatch) => {
     return {
         setIsRoomHostAction : (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
     };
};

export default connect(mapStoreStateToProps , mapActionsToProps)(JoinRoomPage);
