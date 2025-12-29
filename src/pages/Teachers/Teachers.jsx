import React, { useState } from "react";
import "./Teachers.css";

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [classesText, setClassesText] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Mathematics",
    experience: 0,
    status: "active",
    classes: []
  });

  // Enhanced static data with IDs for CRUD operations
  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      email: "sarah.j@school.edu", 
      department: "Mathematics", 
      experience: 8, 
      status: "active",
      classes: ["Class 2A", "Class 3B"] 
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      email: "michael.c@school.edu", 
      department: "English", 
      experience: 12, 
      status: "active",
      classes: ["Class 4A", "Class 2B"] 
    },
    { 
      id: 3, 
      name: "Emily Davis", 
      email: "emily.d@school.edu", 
      department: "Science", 
      experience: 6, 
      status: "active",
      classes: ["Class 3A", "Class 4B"] 
    },
    { 
      id: 4, 
      name: "James Wilson", 
      email: "james.w@school.edu", 
      department: "Social Studies", 
      experience: 15, 
      status: "active",
      classes: ["Class 2C", "Class 3C"] 
    },
    { 
      id: 5, 
      name: "Lisa Martinez", 
      email: "lisa.m@school.edu", 
      department: "Physical Education", 
      experience: 10, 
      status: "on-leave",
      classes: ["Class 4C"] 
    },
    { 
      id: 6, 
      name: "Robert Brown", 
      email: "robert.b@school.edu", 
      department: "Mathematics", 
      experience: 20, 
      status: "active",
      classes: ["Class 2D", "Class 3D"] 
    }
  ]);

  const departments = ["all", "Mathematics", "English", "Science", "Social Studies", "Physical Education"];

  // Filter teachers based on search and department
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.classes.some(cls => cls.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // CRUD Operations
  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setFormData({
      name: "",
      email: "",
      department: "Mathematics",
      experience: 0,
      status: "active",
      classes: []
    });
    setShowModal(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      department: teacher.department,
      experience: teacher.experience,
      status: teacher.status,
      classes: teacher.classes
    });
    setShowModal(true);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    }
  };

  const handleSaveTeacher = () => {
    if (editingTeacher) {
      // Update existing teacher
      setTeachers(teachers.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { ...teacher, ...formData }
          : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher = {
        id: Math.max(...teachers.map(t => t.id)) + 1,
        ...formData
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowModal(false);
  };

  const handleViewTeacher = (teacher) => {
    alert(`Teacher Details:\n\nName: ${teacher.name}\nEmail: ${teacher.email}\nDepartment: ${teacher.department}\nExperience: ${teacher.experience} years\nStatus: ${teacher.status}\nClasses: ${teacher.classes.join(', ')}`);
  };

  const handleScheduleTeacher = (teacher) => {
    alert(`Schedule for ${teacher.name}:\n\nThis feature would show the teacher's weekly schedule.\nCurrently showing placeholder for ${teacher.classes.join(', ')}`);
  };

  return (
    <div className="teachers">
      <div className="teachers-header">
        <h1>Teachers Management</h1>
        <button className="add-teacher-btn" onClick={handleAddTeacher}>+ Add Teacher</button>
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
          <p>Avg Experience</p>
        </div>
      </div>

      <div className="teachers-grid">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="teacher-card">
            <div className="teacher-avatar">
              <span className="avatar-initials">
                {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            
            <div className="teacher-info">
              <h3>{teacher.name}</h3>
              <p className="teacher-email">{teacher.email}</p>
              <div className="teacher-details">
                <span className="department">{teacher.department}</span>
                <span className={`status-badge ${teacher.status}`}>
                  {teacher.status === 'active' ? 'Active' : 'On Leave'}
                </span>
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
              <button className="action-btn view" onClick={() => handleViewTeacher(teacher)}>View</button>
              <button className="action-btn edit" onClick={() => handleEditTeacher(teacher)}>Edit</button>
              <button className="action-btn schedule" onClick={() => handleScheduleTeacher(teacher)}>Schedule</button>
              <button className="action-btn delete" onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Teacher */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h2>
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
                <label>Department:</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>
              <div className="form-group">
                <label>Experience (years):</label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>Classes (comma-separated):</label>
                <input
                  type="text"
                  value={classesText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setClassesText(text);

                    setFormData({
                      ...formData,
                      classes: text
                      .split(',')
                      .map(c => c.trim())
                      .filter(c => c)
                    })
                  }}
                  placeholder="e.g., Class 2A, Class 3B"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveTeacher}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}