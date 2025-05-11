import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUserCog, FaClipboardList, FaDatabase, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; // same CSS file

const AdminSidebar = () => {
  const name = localStorage.getItem('name');
  console.log("name=",name);
  return (
    <div className="sidebar d-flex flex-column text-black p-3 vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="sidebar-profile text-center mb-4 p-3 rounded">
        <img
          src="user.png"
          alt="admin-profile"
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
        <h5>Admin </h5>
        <p className="text-muted">{name}</p>
      </div>

      <Nav defaultActiveKey="/adminDashboard" className="flex-column p-3">
        <Nav.Link href="/adminDashboard" className="text-dark mb-2">
          <FaClipboardList className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="/manage-users" className="text-dark mb-2">
          <FaUserCog className="me-2" /> Manage Users
        </Nav.Link>
        <Nav.Link href="/add-policies" className="text-dark mb-2">
          <FaDatabase className="me-2" /> Add Policies
        </Nav.Link>
        <Nav.Link href="/admin/contact-messages" className="text-dark mb-2">
          <FaChartBar className="me-2" /> View Customer Messages
        </Nav.Link>
        <Nav.Link href="/signUp" className="text-dark mb-2">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
