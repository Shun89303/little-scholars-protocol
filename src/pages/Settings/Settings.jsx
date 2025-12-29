import React, { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("general");
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Settings state with default values
  const [settings, setSettings] = useState({
    general: {
      schoolName: "Little Scholars Primary School",
      academicYear: "2024-2025",
      timezone: "UTC+06:30",
      language: "English",
      dateFormat: "MM/DD/YYYY"
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReports: true,
      attendanceAlerts: true,
      gradeUpdates: false,
      systemMaintenance: true
    },
    security: {
      sessionTimeout: 30,
      passwordExpiry: 90,
      twoFactorAuth: false,
      requireStrongPasswords: true,
      loginAttempts: 5,
      lockoutDuration: 15
    }
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('littleScholarsSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem('littleScholarsSettings', JSON.stringify(settings));
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

  // Reset settings to defaults
  const resetSettings = () => {
    const defaultSettings = {
      general: {
        schoolName: "Little Scholars Primary School",
        academicYear: "2024-2025",
        timezone: "UTC+06:30",
        language: "English",
        dateFormat: "MM/DD/YYYY"
      },
      notifications: {
        emailAlerts: true,
        pushNotifications: true,
        weeklyReports: true,
        attendanceAlerts: true,
        gradeUpdates: false,
        systemMaintenance: true
      },
      security: {
        sessionTimeout: 30,
        passwordExpiry: 90,
        twoFactorAuth: false,
        requireStrongPasswords: true,
        loginAttempts: 5,
        lockoutDuration: 15
      }
    };
    setSettings(defaultSettings);
    setShowResetConfirmation(false);
    saveSettings();
  };

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const sections = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "security", name: "Security", icon: "🔒" }
  ];

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <div className="settings-actions">
          <button className="reset-btn" onClick={() => setShowResetConfirmation(true)}>
            Reset to Defaults
          </button>
          <button className="save-btn" onClick={saveSettings}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="save-notification">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Reset Settings</h2>
              <button className="close-btn" onClick={() => setShowResetConfirmation(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to reset all settings to their default values? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowResetConfirmation(false)}>Cancel</button>
              <button className="reset-confirm-btn" onClick={resetSettings}>Reset</button>
            </div>
          </div>
        </div>
      )}

      <div className="settings-content">
        <div className="settings-sidebar">
          {sections.map(section => (
            <button
              key={section.id}
              className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="sidebar-icon">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        <div className="settings-main">
          {/* General Settings */}
          {activeSection === "general" && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <div className="settings-grid">
                <div className="form-group">
                  <label>School Name:</label>
                  <input
                    type="text"
                    value={settings.general.schoolName}
                    onChange={(e) => handleInputChange('general', 'schoolName', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Academic Year:</label>
                  <input
                    type="text"
                    value={settings.general.academicYear}
                    onChange={(e) => handleInputChange('general', 'academicYear', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Timezone:</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                  >
                    <option value="UTC+06:30">UTC+06:30 (Yangon)</option>
                    <option value="UTC+00:00">UTC+00:00 (London)</option>
                    <option value="UTC-05:00">UTC-05:00 (New York)</option>
                    <option value="UTC-08:00">UTC-08:00 (Los Angeles)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language:</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Chinese">Chinese</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date Format:</label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === "notifications" && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="settings-grid">
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="emailAlerts"
                      checked={settings.notifications.emailAlerts}
                      onChange={(e) => handleInputChange('notifications', 'emailAlerts', e.target.checked)}
                    />
                    <label htmlFor="emailAlerts">Email Alerts</label>
                  </div>
                  <p className="form-description">Receive important updates via email</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <label htmlFor="pushNotifications">Push Notifications</label>
                  </div>
                  <p className="form-description">Browser notifications for real-time updates</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="weeklyReports"
                      checked={settings.notifications.weeklyReports}
                      onChange={(e) => handleInputChange('notifications', 'weeklyReports', e.target.checked)}
                    />
                    <label htmlFor="weeklyReports">Weekly Reports</label>
                  </div>
                  <p className="form-description">Summary of weekly activities and performance</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="attendanceAlerts"
                      checked={settings.notifications.attendanceAlerts}
                      onChange={(e) => handleInputChange('notifications', 'attendanceAlerts', e.target.checked)}
                    />
                    <label htmlFor="attendanceAlerts">Attendance Alerts</label>
                  </div>
                  <p className="form-description">Notifications for student attendance issues</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="gradeUpdates"
                      checked={settings.notifications.gradeUpdates}
                      onChange={(e) => handleInputChange('notifications', 'gradeUpdates', e.target.checked)}
                    />
                    <label htmlFor="gradeUpdates">Grade Updates</label>
                  </div>
                  <p className="form-description">Notifications when new grades are posted</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="systemMaintenance"
                      checked={settings.notifications.systemMaintenance}
                      onChange={(e) => handleInputChange('notifications', 'systemMaintenance', e.target.checked)}
                    />
                    <label htmlFor="systemMaintenance">System Maintenance</label>
                  </div>
                  <p className="form-description">Alerts about scheduled maintenance</p>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <div className="settings-grid">
                <div className="form-group">
                  <label>Session Timeout (minutes):</label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                  <p className="form-description">Automatically log out after inactivity</p>
                </div>
                <div className="form-group">
                  <label>Password Expiry (days):</label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
                  />
                  <p className="form-description">Force password change after this period</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                    <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                  </div>
                  <p className="form-description">Require additional verification for login</p>
                </div>
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="requireStrongPasswords"
                      checked={settings.security.requireStrongPasswords}
                      onChange={(e) => handleInputChange('security', 'requireStrongPasswords', e.target.checked)}
                    />
                    <label htmlFor="requireStrongPasswords">Require Strong Passwords</label>
                  </div>
                  <p className="form-description">Enforce complex password requirements</p>
                </div>
                <div className="form-group">
                  <label>Max Login Attempts:</label>
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleInputChange('security', 'loginAttempts', parseInt(e.target.value))}
                  />
                  <p className="form-description">Lock account after failed attempts</p>
                </div>
                <div className="form-group">
                  <label>Lockout Duration (minutes):</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    value={settings.security.lockoutDuration}
                    onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
                  />
                  <p className="form-description">Account lockout duration after failed attempts</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}