import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  role: Yup.string().oneOf(['admin', 'user'], 'Select a role').required('Role is required'),
});

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5800/api/register', values);

      // Save token and role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      // Redirect to respective dashboard
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }

    resetForm();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Section */}
      <div style={{ flex: 1, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          Online <span style={{ color: '#6f42c1' }}>Insurance</span> Portal
        </h1>
      </div>

      {/* Right Section */}
      <div style={{ flex: 1, backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '400px', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign Up</h2>

          <Formik
            initialValues={{ fullName: '', email: '', password: '', role: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div style={{ marginBottom: '15px' }}>
                  <label>Full Name</label>
                  <Field name="fullName" type="text" style={{ width: '100%', padding: '8px' }} />
                  <ErrorMessage name="fullName" component="div" style={{ color: 'red' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Email</label>
                  <Field name="email" type="email" style={{ width: '100%', padding: '8px' }} />
                  <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Password</label>
                  <Field name="password" type="password" style={{ width: '100%', padding: '8px' }} />
                  <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Select Role:</label>
                  <div>
                    <label>
                      <Field type="radio" name="role" value="user" />
                      User
                    </label>
                    <label style={{ marginLeft: '20px' }}>
                      <Field type="radio" name="role" value="admin" />
                      Admin
                    </label>
                  </div>
                  <ErrorMessage name="role" component="div" style={{ color: 'red' }} />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#6f42c1', color: '#fff', border: 'none', borderRadius: '4px' }}>
                  Register
                </button>

                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  Already have an account?{' '}
                  <a href="/login" style={{ color: '#6f42c1', fontWeight: 'bold', textDecoration: 'none' }}>
                    Log in
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
