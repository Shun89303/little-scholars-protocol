import React, { useState } from "react";
import "./Teachers.css";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Bare minimum static data
  const teachers = [
    { id: 1, name: "Mrs. Sarah Smith", email: "sarah.smith@school.edu", department: "Mathematics", classes: ["Class 2A", "Class 3B"], experience: 8, status: "active" },
    { id: 2, name: "Mr. John Johnson", email: "john.johnson@school.edu", department: "English", classes: ["Class 2B", "Class 4A"], experience: 12, status: "active" },
    { id: 3, name: "Ms. Emily Davis", email: "emily.davis@school.edu", department: "Science", classes: ["Class 3A", "Class 4B"], experience: 6, status: "active" },
    { id: 4, name: "Mr. Michael Wilson", email: "michael.wilson@school.edu", department: "Social Studies", classes: ["Class 2A", "Class 3A"], experience: 15, status: "active" },
    { id: 5, name: "Mrs. Lisa Chen", email: "lisa.chen@school.edu", department: "Mathematics", classes: ["Class 4A", "Class 4B"], experience: 10, status: "active" },
    { id: 6, name: "Mr. David Martinez", email: "david.martinez@school.edu", department: "Physical Education", classes: ["Class 2B", "Class 3B"], experience: 5, status: "on_leave" }
  ];

  const departments = ["all", "Mathematics", "English", "Science", "Social Studies", "Physical Education"];

  // Filter teachers based on search and department
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.classes.some(cls => cls.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="teachers">
      <div className="teachers-header">
        <h1>Teachers Management</h1>
        <button className="add-teacher-btn">+ Add Teacher</button>
      </div>

      <div className="teachers-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="department-filter">
          <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="teachers-stats">
        <div className="stat-card">
          <h3>{teachers.length}</h3>
          <p>Total Teachers</p>
        </div>
        <div className="stat-card">
          <h3>{teachers.filter(t => t.status === 'active').length}</h3>
          <p>Active Teachers</p>
        </div>
        <div className="stat-card">
          <h3>{Math.round(teachers.reduce((acc, t) => acc + t.experience, 0) / teachers.length)}</h3>
          <p>Avg Experience (Years)</p>
        </div>
      </div>

      <div className="teachers-grid">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="teacher-card">
            <div className="teacher-header">
              <div className="teacher-avatar">
                <div className="avatar-placeholder">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <p className="teacher-department">{teacher.department}</p>
              </div>
              <div className="teacher-status">
                <span className={`status-badge ${teacher.status === 'active' ? 'active' : 'on-leave'}`}>
                  {teacher.status === 'active' ? 'Active' : 'On Leave'}
                </span>
              </div>
            </div>
            
            <div className="teacher-details">
              <div className="teacher-contact">
                <span className="label">Email:</span>
                <span className="value">{teacher.email}</span>
              </div>
              <div className="teacher-experience">
                <span className="label">Experience:</span>
                <span className="value">{teacher.experience} years</span>
              </div>
              <div className="teacher-classes">
                <span className="label">Classes:</span>
                <div className="class-tags">
                  {teacher.classes.map((cls, index) => (
                    <span key={index} className="class-tag">{cls}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="teacher-actions">
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