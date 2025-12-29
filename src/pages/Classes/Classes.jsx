import React, { useState } from "react";
import "./Classes.css";

export default function Classes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    teacher: "",
    room: "",
    grade: "2nd",
    students: 0,
    schedule: "9:00 AM - 10:00 AM"
  });

  // Enhanced static data with IDs for CRUD operations
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 2A", teacher: "Mrs. Sarah Smith", room: "Room 101", grade: "2nd", students: 25, schedule: "9:00 AM - 10:00 AM" },
    { id: 2, name: "Class 3B", teacher: "Mr. John Johnson", room: "Room 102", grade: "3rd", students: 22, schedule: "10:00 AM - 11:00 AM" },
    { id: 3, name: "Class 4A", teacher: "Ms. Emily Davis", room: "Room 201", grade: "4th", students: 28, schedule: "11:00 AM - 12:00 PM" },
    { id: 4, name: "Class 2B", teacher: "Mr. Michael Wilson", room: "Room 103", grade: "2nd", students: 24, schedule: "1:00 PM - 2:00 PM" },
    { id: 5, name: "Class 3A", teacher: "Mrs. Lisa Chen", room: "Room 202", grade: "3rd", students: 26, schedule: "2:00 PM - 3:00 PM" },
    { id: 6, name: "Class 4B", teacher: "Mr. David Martinez", room: "Room 203", grade: "4th", students: 23, schedule: "3:00 PM - 4:00 PM" }
  ]);

  const grades = ["all", "2nd", "3rd", "4th"];

  // Filter classes based on search and grade
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || cls.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  // CRUD Operations
  const handleAddClass = () => {
    setEditingClass(null);
    setFormData({
      name: "",
      teacher: "",
      room: "",
      grade: "2nd",
      students: 0,
      schedule: "9:00 AM - 10:00 AM"
    });
    setShowModal(true);
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      teacher: cls.teacher,
      room: cls.room,
      grade: cls.grade,
      students: cls.students,
      schedule: cls.schedule
    });
    setShowModal(true);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter(cls => cls.id !== classId));
    }
  };

  const handleSaveClass = () => {
    if (editingClass) {
      // Update existing class
      setClasses(classes.map(cls => 
        cls.id === editingClass.id 
          ? { ...cls, ...formData }
          : cls
      ));
    } else {
      // Add new class
      const newClass = {
        id: Math.max(...classes.map(c => c.id)) + 1,
        ...formData
      };
      setClasses([...classes, newClass]);
    }
    setShowModal(false);
  };

  const handleViewClass = (cls) => {
    alert(`Class Details:\n\nName: ${cls.name}\nTeacher: ${cls.teacher}\nRoom: ${cls.room}\nGrade: ${cls.grade}\nStudents: ${cls.students}\nSchedule: ${cls.schedule}`);
  };

  return (
    <div className="classes">
      <div className="classes-header">
        <h1>Classes Management</h1>
        <button className="add-class-btn" onClick={handleAddClass}>+ Add Class</button>
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
          <h3>{classes.reduce((acc, cls) => acc + cls.students, 0)}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{Math.round(classes.reduce((acc, cls) => acc + cls.students, 0) / classes.length)}</h3>
          <p>Avg Class Size</p>
        </div>
      </div>

      <div className="classes-grid">
        {filteredClasses.map(cls => (
          <div key={cls.id} className="class-card">
            <div className="class-header">
              <h3>{cls.name}</h3>
              <span className="class-grade">{cls.grade}</span>
            </div>
            
            <div className="class-details">
              <div className="class-info">
                <span className="label">Teacher:</span>
                <span className="value">{cls.teacher}</span>
              </div>
              <div className="class-info">
                <span className="label">Room:</span>
                <span className="value">{cls.room}</span>
              </div>
              <div className="class-info">
                <span className="label">Students:</span>
                <span className="value">{cls.students}</span>
              </div>
              <div className="class-info">
                <span className="label">Schedule:</span>
                <span className="value">{cls.schedule}</span>
              </div>
            </div>
            
            <div className="class-actions">
              <button className="action-btn view" onClick={() => handleViewClass(cls)}>View</button>
              <button className="action-btn edit" onClick={() => handleEditClass(cls)}>Edit</button>
              <button className="action-btn delete" onClick={() => handleDeleteClass(cls.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Class */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingClass ? "Edit Class" : "Add New Class"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Class Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teacher:</label>
                <input
                  type="text"
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Room:</label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Grade:</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                >
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Students:</label>
                <input
                  type="number"
                  min="0"
                  value={formData.students}
                  onChange={(e) => setFormData({...formData, students: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Schedule:</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  placeholder="e.g., 9:00 AM - 10:00 AM"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveClass}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}