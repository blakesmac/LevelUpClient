import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../game/GameProvider";
import { EventContext } from "./EventProvider";

export const EventForm = () => {
  const history = useHistory();
  const { getGames, games } =useContext(GameContext) 
  const { createEvent } = useContext(EventContext)
  const [currentEvent, setEvent] = useState({
    gameId: "",
    evntdate: "",
    gamer: 0,
  });

  useEffect(() => {
    getGames();
  }, []);

  const changeEventGameState = (domEvent) => {
    const newEventState = {...currentEvent };
    newEventState.gameId = domEvent.target.value;
    setEvent(newEventState);
  };

  const changeEventDateState = (domEvent) => {
    const newEventState = {...currentEvent };
    newEventState.evntdate = domEvent.target.value;
    setEvent(newEventState);
  };

  const changeEventPlayerState = (domEvent) => {
    const newEventState = {...currentEvent };
    newEventState.gamer = domEvent.target.value;
    setEvent(newEventState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventGameState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                  {game.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
          <div className= "form-group">
              <label htmlFor="evntdate">Date: </label>
              <input 
                type="date"
                name="evntdate"
                required autoFocus
                className="form-control"
                defaultValue={currentEvent.evntdate}
                onChange={changeEventDateState} />
          </div>
        </fieldset>
        <fieldset>
          <div className= "form-group">
              <label htmlFor="gamer">Player: </label>
              <input 
                type="number"
                name="gamer"
                required autoFocus
                className="form-control"
                defaultValue={currentEvent.gamer}
                onChange={changeEventPlayerState} />
          </div>
        </fieldset>

      

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

         const event = {
             gameId: parseInt(currentEvent.gameId),
             evntdate: currentEvent.evntdate,
             gamer: parseInt(currentEvent.gamer)
         };

          // Once event is created, redirect user to event list
          createEvent(event).then(() => history.push("/events"))
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};