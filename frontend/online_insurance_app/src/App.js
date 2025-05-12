import 'bootstrap/dist/css/bootstrap.min.css';

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css'
import AdminDashboard from './components/AdminDashboard.js';
import ProtectedLayout from './components/ProtectedLayout.js';
import AdminContactMessages from './components/AdminContactMessages.js';
import AdminManageUsers from './components/AdminManageUsers.js';
import ViewAvailablePolicies from './components/ViewPolicies.js';
import MyPolicies from './components/MyPolicies.js';
import AddPolicyForm from './components/AddPolicyForm.js';
import ManagePolicies from './components/ManagePolicies.js';
import About from './components/About.js';
import Home from './components/Home.js';
function App() {
  return (
    <Router>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container mt-4 main-content">
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/about' element={<About/>}></Route>
          <Route element={<ProtectedLayout role="admin" />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
              <Route path='/manage-users' element={<AdminManageUsers/>}></Route>
              <Route path='/add-policies' element={<AddPolicyForm/>}></Route>
              <Route path='/manage-policies' element={<ManagePolicies/>}></Route>
            </Route>


         <Route element={<ProtectedLayout role="user" />}> 
         <Route path='/user-dashboard' element={<Dashboard/>}></Route>
         <Route path="/apply-policy" element={<MyPolicies />} />
<Route path="/view-policies" element={<ViewAvailablePolicies />} />

       </Route>
         
        </Routes>
      </div>

      <Footer />
    </div>
  </Router>
  );
}

export default App;
