import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Videos from "./components/Video/Videos";
import { Route, Routes } from "react-router-dom";
import Player from "./components/Player/Player";
import NewVideo from "./components/CreateNew/NewVideo";

const App = () => {
  return (
    <div className="youtube">
      <Navbar />
      <Routes>
        <Route path="/" element={<Videos />} />
        <Route path="/search" element={<Videos />} /> {/* Added route for search */}
        <Route path="/playing/:title" element={<Player />} />
        <Route path="/create" element={<NewVideo />} />
      </Routes>
    </div>
  );
};

export default App;
