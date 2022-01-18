import React, { useState, createContext } from "react";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gametypes, setTypes] = useState([]);

  const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGames);
  };

  const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    }).then((response) => response.json())
      .then(getGames);
  };


    const getGameTypes = () => {
        return fetch("http://localhost:8000/gametypes", {
            headers: {
                Authorization: `Token ${localStorage.getItem("lu_token")}`,
            },
        })
        .then((response) => response.json())
        .then(setTypes);
    };

  return (
    <GameContext.Provider value={{ games, getGames, createGame, gametypes, setTypes, getGameTypes }}>
      {props.children}
    </GameContext.Provider>
  );
};