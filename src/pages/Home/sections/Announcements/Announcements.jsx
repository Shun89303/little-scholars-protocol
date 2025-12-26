import React from "react";
import "./Announcements.css";

const Announcements = () => {
  // static demo data
  const announcements = [
    { id: 1, title: "System Update", message: "Version 1.0.0 released", isNew: true },
    { id: 2, title: "Holiday Notice", message: "School closed on Dec 31", isNew: false },
    { id: 3, title: "Staff Meeting", message: "Meeting at 3 PM in room 101", isNew: true },
  ];

  return (
    <section className="announcements">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((item) => (
          <li key={item.id} className="announcement-item">
            <div className="announcement-title">
              {item.title} {item.isNew && <span className="new-badge">new</span>}
            </div>
            <div className="announcement-message">{item.message}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Announcements;