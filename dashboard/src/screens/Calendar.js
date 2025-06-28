import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/sidebar";
import Main from "../components/Header";
import axios from "axios";

const localizer = momentLocalizer(moment);

const Calendar1 = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("/api/events")
      .then((response) => {
        // Make sure the response data is in the correct format for react-big-calendar
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isDateInPast = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  const handleEventAdd = (newEvent) => {
    if (isDateInPast(newEvent.start)) {
      alert("Cannot add events on previous dates.");
      return;
    }

    axios
      .post("/api/events", newEvent)
      .then((response) => {
        const formattedEvent = {
          ...response.data,
          start: new Date(response.data.start),
          end: new Date(response.data.end),
        };
        setEvents([...events, formattedEvent]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEventUpdate = (updatedEvent) => {
    if (isDateInPast(updatedEvent.start)) {
      alert("Cannot update events to previous dates.");
      return;
    }

    if (updatedEvent.title === "") {
      handleEventDelete(updatedEvent);
    } else if (updatedEvent.title === null) {
      return;
    } else {
      axios
        .put(`/api/events/${updatedEvent._id}`, updatedEvent)
        .then((response) => {
          const updatedEvents = events.map((event) =>
            event._id === response.data._id ? response.data : event
          );
          setEvents(updatedEvents);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEventDelete = (eventToDelete) => {
    axios
      .delete(`/api/events/${eventToDelete._id}`)
      .then(() => {
        const updatedEvents = events.filter(
          (event) => event._id !== eventToDelete._id
        );
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <Sidebar />
        <main className="main-wrap">
          <Main />
          <section className="content-main">
            <div className="content-header">
              <h2 className="content-title">Team Calendar</h2>
            </div>
          </section>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={(slotInfo) => {
              const title = prompt("Enter event title:");
              if (title) {
                const newEvent = {
                  title,
                  start: slotInfo.start,
                  end: slotInfo.end,
                };
                handleEventAdd(newEvent);
              }
            }}
            onSelectEvent={(event) => {
              const title = prompt("Update event title:", event.title);
              const updatedEvent = {
                ...event,
                title,
              };
              handleEventUpdate(updatedEvent);
            }}
            onSelecting={(range) => {
              return range.start === range.end;
            }}
            onDoubleClickEvent={(event) => {
              if (
                window.confirm("Are you sure you want to delete this event?")
              ) {
                handleEventDelete(event);
              }
            }}
            style={{ height: "520px" }}
          />
        </main>
      </div>
    </>
  );
};

export default Calendar1;
