import {useEffect , React} from 'react';
import imageChild from "../resources/images/online-study.jpg";
import {useLocation} from "react-router-dom";
import "./JoinRoomPage.css";
import {connect} from "react-redux";
import { setIsRoomHost } from '../store/actions';
import JoinRoomPageTitle from './JoinRoomPageTitle';
import JoinRoomContent from './JoinRoomContent';
import NavBar from '../Navbar/NavBar';
import { Grid } from "@mui/material";

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
        <div className="join_room_page_container">
            <NavBar />
            {/* <div className='join_room_page_panel' >
                <JoinRoomPageTitle isRoomHost={isRoomHost}/>
                <JoinRoomContent />
            </div> */}
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={6}>
                    {/* <div className="introduction_page_panel">
                        <ConnectingButtons />
                    </div> */}
                    <div className="left-grid">
                        <div className="join_room_page_panel">
                            <JoinRoomPageTitle isRoomHost={isRoomHost} />
                            <JoinRoomContent />
                        </div>
                        {/* <ConnectingButtons /> */}
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={imageChild} className="image" alt="child study" />
                </Grid>
            </Grid>
            <div className="footer">Made with ❤️ by teem @kdk</div>
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
