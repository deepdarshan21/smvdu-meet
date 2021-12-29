import React , {useEffect} from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import RoomPage from "./RoomPage/RoomPage";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import { connectWithSocketIOServer } from './utils/wss';
import './App.css';

function App() {

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroductionPage/>} />
        <Route path = "/join-room" element={<JoinRoomPage/>} />
        <Route path = "/room" element={<RoomPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
