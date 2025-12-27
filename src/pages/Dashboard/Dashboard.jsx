import React, { useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Bare minimum static data
  const stats = {
    totalStudents: 324,
    totalClasses: 12,
    totalTeachers: 18,
    attendanceRate: 92.5,
    avgGrade: 85.3
  };

  const recentActivities = [
    { id: 1, type: "student", action: "New student enrolled", name: "Emma Johnson", time: "2 hours ago" },
    { id: 2, type: "grade", action: "Grades submitted", name: "Math - Grade 3", time: "4 hours ago" },
    { id: 3, type: "attendance", action: "Attendance marked", name: "Class 2A", time: "6 hours ago" }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Academic Dashboard</h1>
        <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalStudents}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalClasses}</h3>
          <p>Total Classes</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalTeachers}</h3>
          <p>Total Teachers</p>
        </div>
        <div className="stat-card">
          <h3>{stats.attendanceRate}%</h3>
          <p>Attendance Rate</p>
        </div>
        <div className="stat-card">
          <h3>{stats.avgGrade}</h3>
          <p>Average Grade</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            {recentActivities.map(activity => (
              <li key={activity.id}>
                <span className="activity-type">{activity.type}</span>
                <span className="activity-action">{activity.action}</span>
                <span className="activity-name">{activity.name}</span>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}