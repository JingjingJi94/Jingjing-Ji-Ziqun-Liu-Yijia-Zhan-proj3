import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home Page
import Rules from "./pages/Rules";
import Game from "./pages/Game";
import HighScores from "./pages/HighScores";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import "./css/game.css";
import "./css/App.css";



//Since Nav is outside <Routes>, it doesn't get replaced when switch pages.
function App() {
  return (
    <Nav> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Nav>
  );
}

export default App;
