import React, { useState } from "react";
import "./Students.css";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  // Bare minimum static data
  const students = [
    { id: 1, name: "Emma Johnson", grade: "4th", email: "emma.j@school.edu", attendance: 95, avgGrade: 92 },
    { id: 2, name: "Michael Brown", grade: "3rd", email: "michael.b@school.edu", attendance: 88, avgGrade: 87 },
    { id: 3, name: "Sarah Chen", grade: "4th", email: "sarah.c@school.edu", attendance: 98, avgGrade: 96 },
    { id: 4, name: "James Wilson", grade: "2nd", email: "james.w@school.edu", attendance: 92, avgGrade: 85 },
    { id: 5, name: "Emily Davis", grade: "3rd", email: "emily.d@school.edu", attendance: 94, avgGrade: 89 },
    { id: 6, name: "Alex Martinez", grade: "2nd", email: "alex.m@school.edu", attendance: 90, avgGrade: 83 }
  ];

  const grades = ["all", "2nd", "3rd", "4th"];

  // Filter students based on search and grade
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="students">
      <div className="students-header">
        <h1>Students Management</h1>
        <button className="add-student-btn">+ Add Student</button>
      </div>

      <div className="students-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students..."
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

      <div className="students-stats">
        <div className="stat-card">
          <h3>{students.length}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%</h3>
          <p>Avg Attendance</p>
        </div>
        <div className="stat-card">
          <h3>{(students.reduce((acc, s) => acc + s.avgGrade, 0) / students.length).toFixed(1)}</h3>
          <p>Avg Grade</p>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Email</th>
              <th>Attendance</th>
              <th>Avg Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td className="student-name">{student.name}</td>
                <td className="student-grade">{student.grade}</td>
                <td className="student-email">{student.email}</td>
                <td className="student-attendance">
                  <span className={`attendance-badge ${student.attendance >= 90 ? 'good' : student.attendance >= 80 ? 'average' : 'low'}`}>
                    {student.attendance}%
                  </span>
                </td>
                <td className="student-grade-avg">{student.avgGrade}</td>
                <td className="student-actions">
                  <button className="action-btn view">View</button>
                  <button className="action-btn edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}