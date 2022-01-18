import React, {useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";


export const GameForm = () => {
    const history = useHistory();
    const { createGame, getGameTypes, } = useContext(GameContext);

    /* providing default values below */


    const [currentGame, setCurrentGame] = useState({
        name: "",
        gameTypeId: 0,
        gamer: 0,
    });

    useEffect(() => {
        getGameTypes();
    }, []);

    const changeGameNameState = (event) => {
        const newGameState = {...currentGame };
        newGameState.name = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGamePlayersState = (event) => {
        const newGameState = {...currentGame };
        newGameState.gamer = event.target.value;
        setCurrentGame(newGameState);
    };

    const changeGameCategoryState = (event) => {
        const newGameState = {...currentGame };
        newGameState.gameTypeId = event.target.value;
        setCurrentGame(newGameState);
    };


    return (
        <form className="gameForm">
            <h2 className="gameForm_title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title: </label>
                    <input 
                        type="text"
                        name="name"
                        required autoFocus
                        className="form-control"
                        value={currentGame.name}
                        onChange={changeGameNameState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Category: </label>
                    <input 
                        type="number"
                        name="gameTypeId"
                        required autoFocus
                        className="form-control"
                        defaultValue={currentGame.gameTypeId}
                        onChange={changeGameCategoryState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gamer">Gamer: </label>
                    <input 
                        type="number"
                        name="gamer"
                        required autoFocus
                        className="form-control"
                        value={currentGame.gamer}
                        onChange={changeGamePlayersState} />
                </div>
            </fieldset>


            <button
                type="submit"
                onClick={(evt) => {
                    evt.preventDefault();

                    const game = {
                        name: currentGame.name,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        gamer: parseInt(currentGame.gamer)
                    };

                    createGame(game).then(() => history.push("/games"));
                }}
                className="btn btn-primary"
            >
                Create
            </button>
        </form>
    );
};