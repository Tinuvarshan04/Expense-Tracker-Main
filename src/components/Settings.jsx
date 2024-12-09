import React, { useContext, useState } from 'react';
import './Settings.css';
import { ProfileContext } from '../context/ProfileContext';

function Settings({ resetData, toggleTheme }) {
  const { userName, setUserName, profilePic, setProfilePic } = useContext(ProfileContext);
  const [localUserName, setLocalUserName] = useState(userName);
  const [localProfilePic, setLocalProfilePic] = useState(profilePic);
  const [fileName, setFileName] = useState('');

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfilePic(reader.result);
        setProfilePic(reader.result); // Update context
      };
      reader.readAsDataURL(file);
      setFileName(file.name); // Update file name
    }
  };

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value);
    setUserName(e.target.value); // Update context
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-container">
        {/* Profile Edit Section */}
        <div className="profile-edit">
          <h3>Edit Profile</h3>
          <img
            src={localProfilePic || 'https://via.placeholder.com/120'}
            alt="Profile"
            className="profile-pic"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            {fileName ? fileName : 'Choose a profile picture'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: 'none' }}
          />
          <input
            type="text"
            value={localUserName}
            onChange={handleUserNameChange}
            placeholder="Enter your name"
          />
        </div>

        {/* Theme Toggle Section */}
        <div className="settings-option">
          <h3>Theme</h3>
          <button onClick={toggleTheme}>Switch Theme</button>
        </div>

        {/* Reset Data Section */}
        <div className="settings-option">
          <h3>Reset</h3>
          <button onClick={resetData}>Reset Data</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

