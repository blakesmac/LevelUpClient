import React, { useContext, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router";
export const EventList = (props) => {
  const { events, getEvents } = useContext(EventContext);
  const history = useHistory()
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <article className="events">
      <header className="events__header">
        <h1>Level Up Game Events</h1>
      </header>
      {events.map((event) => {
        return (
          <section key={event.id} className="registration">
            <div className="registration__game">{event.game.name}</div>
            <div></div>
            <div>
              {new Date(event.evntdate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              
            </div>
          </section>
        );
      })}
      <button
        className="btn btn-event btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/events/new"});
        }}
      >
        Register New Event

      </button>
    </article>
  );
};