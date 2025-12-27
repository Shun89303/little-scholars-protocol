import React, { useState } from "react";
import "./Classes.css";

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  // Bare minimum static data
  const classes = [
    { id: 1, name: "Class 2A", grade: "2nd", teacher: "Mrs. Smith", students: 24, schedule: "Mon-Wed-Fri 9:00 AM", room: "Room 101" },
    { id: 2, name: "Class 2B", grade: "2nd", teacher: "Mr. Johnson", students: 22, schedule: "Tue-Thu 9:00 AM", room: "Room 102" },
    { id: 3, name: "Class 3A", grade: "3rd", teacher: "Ms. Davis", students: 26, schedule: "Mon-Wed-Fri 10:00 AM", room: "Room 201" },
    { id: 4, name: "Class 3B", grade: "3rd", teacher: "Mr. Wilson", students: 25, schedule: "Tue-Thu 10:00 AM", room: "Room 202" },
    { id: 5, name: "Class 4A", grade: "4th", teacher: "Mrs. Chen", students: 28, schedule: "Mon-Wed-Fri 11:00 AM", room: "Room 301" },
    { id: 6, name: "Class 4B", grade: "4th", teacher: "Mr. Martinez", students: 27, schedule: "Tue-Thu 11:00 AM", room: "Room 302" }
  ];

  const grades = ["all", "2nd", "3rd", "4th"];

  // Filter classes based on search and grade
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || classItem.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="classes">
      <div className="classes-header">
        <h1>Classes Management</h1>
        <button className="add-class-btn">+ Add Class</button>
      </div>

      <div className="classes-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grade-filter">
          <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
            {grades.map(grade => (
              <option key={grade} value={grade}>
                {grade === "all" ? "All Grades" : `Grade ${grade}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="classes-stats">
        <div className="stat-card">
          <h3>{classes.length}</h3>
          <p>Total Classes</p>
        </div>
        <div className="stat-card">
          <h3>{classes.reduce((acc, c) => acc + c.students, 0)}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{Math.round(classes.reduce((acc, c) => acc + c.students, 0) / classes.length)}</h3>
          <p>Avg Class Size</p>
        </div>
      </div>

      <div className="classes-grid">
        {filteredClasses.map(classItem => (
          <div key={classItem.id} className="class-card">
            <div className="class-header">
              <h3>{classItem.name}</h3>
              <span className="class-grade">{classItem.grade}</span>
            </div>
            <div className="class-details">
              <div className="class-info">
                <span className="label">Teacher:</span>
                <span className="value">{classItem.teacher}</span>
              </div>
              <div className="class-info">
                <span className="label">Students:</span>
                <span className="value">{classItem.students}</span>
              </div>
              <div className="class-info">
                <span className="label">Schedule:</span>
                <span className="value">{classItem.schedule}</span>
              </div>
              <div className="class-info">
                <span className="label">Room:</span>
                <span className="value">{classItem.room}</span>
              </div>
            </div>
            <div className="class-actions">
              <button className="action-btn view">View</button>
              <button className="action-btn edit">Edit</button>
              <button className="action-btn schedule">Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}