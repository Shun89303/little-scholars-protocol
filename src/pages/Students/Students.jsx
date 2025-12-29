import React, { useState } from "react";
import "./Students.css";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "2nd",
    attendance: 95,
    avgGrade: 85
  });

  // Enhanced static data with IDs for CRUD operations
  const [students, setStudents] = useState([
    { id: 1, name: "Emma Johnson", grade: "4th", email: "emma.j@school.edu", attendance: 95, avgGrade: 92 },
    { id: 2, name: "Michael Brown", grade: "3rd", email: "michael.b@school.edu", attendance: 88, avgGrade: 87 },
    { id: 3, name: "Sarah Chen", grade: "4th", email: "sarah.c@school.edu", attendance: 98, avgGrade: 96 },
    { id: 4, name: "James Wilson", grade: "2nd", email: "james.w@school.edu", attendance: 92, avgGrade: 85 },
    { id: 5, name: "Emily Davis", grade: "3rd", email: "emily.d@school.edu", attendance: 94, avgGrade: 89 },
    { id: 6, name: "Alex Martinez", grade: "2nd", email: "alex.m@school.edu", attendance: 90, avgGrade: 83 }
  ]);

  const grades = ["all", "2nd", "3rd", "4th"];

  // Filter students based on search and grade
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  // CRUD Operations
  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      email: "",
      grade: "2nd",
      attendance: 95,
      avgGrade: 85
    });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
      attendance: student.attendance,
      avgGrade: student.avgGrade
    });
    setShowModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...formData }
          : student
      ));
    } else {
      // Add new student
      const newStudent = {
        id: Math.max(...students.map(s => s.id)) + 1,
        ...formData
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
  };

  const handleViewStudent = (student) => {
    alert(`Student Details:\n\nName: ${student.name}\nEmail: ${student.email}\nGrade: ${student.grade}\nAttendance: ${student.attendance}%\nAverage Grade: ${student.avgGrade}`);
  };

  return (
    <div className="students">
      <div className="students-header">
        <h1>Students Management</h1>
        <button className="add-student-btn" onClick={handleAddStudent}>+ Add Student</button>
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
                  <button className="action-btn view" onClick={() => handleViewStudent(student)}>View</button>
                  <button className="action-btn edit" onClick={() => handleEditStudent(student)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit Student */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                <label>Attendance (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Average Grade:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.avgGrade}
                  onChange={(e) => setFormData({...formData, avgGrade: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveStudent}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}