import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const navigate = useNavigate();
  const location = useLocation(); // Detect route changes

  // Refresh token & role when route changes (like after login)
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Insurance Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
               
              </>
            )}

            {token && role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link" to="/user-dashboard">User Dashboard</Link>
              </li>
            )}

            {token && role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                <Link className='nav-link' to="/admin/contact-messages"></Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
            </li>

            {token && (
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
