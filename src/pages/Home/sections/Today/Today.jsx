import React from "react";
import "./Today.css";

const Today = () => {
  // Static example data for now
  const todaysClasses = [
    { time: "08:00 - 09:00", name: "Math - Grade 1" },
    { time: "09:15 - 10:15", name: "English - Grade 2" },
    { time: "10:30 - 11:30", name: "Science - Grade 3" },
  ];

  const upcomingEvents = [
    { date: "2025-12-28", event: "Parent-Teacher Meeting" },
    { date: "2026-01-05", event: "Field Trip - Grade 2" },
    { date: "2026-01-12", event: "Sports Day" },
  ];

  return (
    <section className="today">
      <h2>Today</h2>

      <div className="today-classes">
        <h3>Today's Classes</h3>
        <ul>
          {todaysClasses.map((cls, idx) => (
            <li key={idx}>
              <span className="time">{cls.time}</span> - <span className="name">{cls.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <ul>
          {upcomingEvents.map((evt, idx) => (
            <li key={idx}>
              <span className="date">{evt.date}</span> - <span className="event">{evt.event}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Today;