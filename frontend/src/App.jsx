import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage"; // Home Page
import Rules from "./pages/RulesPage";
import Game from "./pages/GamePage";
import HighScores from "./pages/HighScoresPage";
import Login from "./pages/LoginPage"; // Login Page
import Register from "./pages/RegisterPage"; // Register Page
import Nav from "./components/Nav";
import AllGames from "./game/AllGames";
import NewGame from "./game/NewGame";
import ActiveGame from "./game/ActiveGame";
import "./css/game.css";
import "./css/App.css";

function App() {
  return (
    <Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/game/create" element={<NewGame />} />
        <Route path="/game/:gameId" element={<ActiveGame />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/highscores" element={<HighScores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Nav>
  );
}

export default App;
