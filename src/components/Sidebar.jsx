import React, { useContext } from 'react';
import './Sidebar.css';
import { ProfileContext } from '../context/ProfileContext';
import { FaHome, FaChartBar, FaHistory, FaCog, FaPhone } from 'react-icons/fa'; // Font Awesome icons

function Sidebar({ onSelect }) {
  const { userName, profilePic } = useContext(ProfileContext);

  const menuItems = [
    { name: 'Home', icon: <FaHome /> },
    { name: 'Graphs', icon: <FaChartBar /> },
    { name: 'History', icon: <FaHistory /> },
    { name: 'Settings', icon: <FaCog /> },
    { name: 'Contact Us', icon: <FaPhone /> },
  ];

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img
          src={profilePic || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="profile-pic"
        />
        <p className="username">{userName || 'User Name'}</p>
      </div>
      <h2 className="sidebar-header">Menu</h2>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="menu-item"
            onClick={() => onSelect(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
