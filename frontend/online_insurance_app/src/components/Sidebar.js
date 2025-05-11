import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaFileAlt, FaHistory, FaQuestionCircle, FaSyncAlt } from 'react-icons/fa';
import './Sidebar.css';


const Sidebar = () => {
  const name= localStorage.getItem('name');
  return (
    <div className="sidebar d-flex flex-column text-black p-3 vh-100" style={{ backgroundColor: "#f8f9fa" }}>
    <div className="sidebar-profile text-center mb-4 p-3 rounded">
      <img
      src="user.png"
      alt="profile"
      className="rounded-circle mb-2"
      style={{
        height: "80px",
        width: "80px",
        objectFit: "cover",
        border: "2px solid white",
        padding: "2px",
        backgroundColor: "white"
      }}
    />
      <h5>{name}</h5>
      <p className="text-muted">( Customer )</p>
    </div>

      <Nav defaultActiveKey="/dashboard" className="flex-column p-3">
        <Nav.Link href="/dashboard" className="text-black mb-2">
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="/apply-policy" className="text-black mb-2">
          <FaFileAlt className="me-2" /> Applied Policy
        </Nav.Link>
       
        <Nav.Link href="/contact" className="text-black mb-2">
          <FaQuestionCircle className="me-2" /> Ask Question
        </Nav.Link>
        <Nav.Link href="/signUp" className="text-black mb-2">
          <FaSyncAlt className="me-2" /> Log Out
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
