import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    maintenanceAlerts: true
  });

  const sections = [
    { id: "general", name: "General" },
    { id: "notifications", name: "Notifications" },
    { id: "security", name: "Security" }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="setting-item">
              <label>School Name</label>
              <input type="text" defaultValue="Little Scholars Academy" />
            </div>
            <div className="setting-item">
              <label>Academic Year</label>
              <input type="text" defaultValue="2024-2025" />
            </div>
            <div className="setting-item">
              <label>Time Zone</label>
              <select defaultValue="UTC-5">
                <option>UTC-5</option>
                <option>UTC-6</option>
                <option>UTC-7</option>
              </select>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <div className="setting-item">
              <label>Email Alerts</label>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
              />
            </div>
            <div className="setting-item">
              <label>Push Notifications</label>
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
              />
            </div>
            <div className="setting-item">
              <label>Weekly Reports</label>
              <input
                type="checkbox"
                checked={notifications.weeklyReports}
                onChange={(e) => setNotifications({...notifications, weeklyReports: e.target.checked})}
              />
            </div>
          </div>
        );
      case "security":
        return (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="setting-item">
              <label>Session Timeout (minutes)</label>
              <input type="number" defaultValue="30" />
            </div>
            <div className="setting-item">
              <label>Password Expiry (days)</label>
              <input type="number" defaultValue="90" />
            </div>
            <div className="setting-item">
              <label>Two-Factor Authentication</label>
              <input type="checkbox" defaultChecked={false} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-btn">Save Changes</button>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          <h3>Settings Menu</h3>
          <ul>
            {sections.map(section => (
              <li
                key={section.id}
                className={activeSection === section.id ? "active" : ""}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="settings-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}