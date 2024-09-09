import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Videos from "./components/Video/Videos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Player from "./components/Player/Player";

const App = () => {
  return (
    <div className="youtube">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Videos />} />
          <Route path="/playing/:title" element={<Player />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
