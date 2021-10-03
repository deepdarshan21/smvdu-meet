import React from "react";
import "./App.css";
import Home from "./components/home";
import Meet from "./components/meet";
import End from "./components/end";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Route path="/" exact component={Home} />
                <Route path="/:id" exact component={Meet} />
                <Route path="/:id/end" exact component={End} />
                {/* <Home /> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
