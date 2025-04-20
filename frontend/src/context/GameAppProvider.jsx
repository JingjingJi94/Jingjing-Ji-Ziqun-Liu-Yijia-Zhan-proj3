import React, { createContext } from "react";

export const GameContext = createContext();

export default function GameAppProvider(props) {
  const globalData = {};
  return (
    <GameContext.Provider value={globalData}>
      {props.children}
    </GameContext.Provider>
  );
}
