This is a Role-Based Online Insurance Portal built with Express.js, MySQL, JWT on the backend, and React with React-Bootstrap, Formik & Yup on the frontend.
It supports two roles: Admin and User.
Admins can manage policies and users, while users can view and apply for policies and contact admins.
The application ensures secure JWT-based authentication, role-based access, and a responsive UI for a seamless experience.
We’ve built an Online Insurance Portal that supports two roles:
Admin
User

Core Functionalities:
Role-based login/signup

Admin Dashboard:
Add/edit/delete policies
Manage users (view & delete)
View messages from users

User Dashboard:
View available policies (added by admin)
Apply for a policy
Contact the admin

 2. Technologies Used
Backend (Node.js):
Express.js – Web framework
MySQL2 – Database connectivity

JWT (jsonwebtoken) – Authentication with secure tokens

Frontend (React):
React.js – SPA frontend
React-Bootstrap – For clean, responsive UI
Formik + Yup – Form handling and validation (login/signup)

React Router – Routing with protected and role-based navigation

3. Application Flow
 Step 1: Signup/Login (Using JWT)
User signs up and chooses a role: 'admin' or 'user'

On login:
A JWT token is generated and saved in local storage
Token contains user's role and ID

Step 2: Role-Based Navigation
If role === 'admin' → redirect to /admin-dashboard

If role === 'user' → redirect to /user-dashboard

4.Authentication & Authorization
JWT token is sent with every protected API request (Authorization: Bearer <token>)
Middleware on the backend validates token and extracts user info
Protected routes on the frontend are accessible only if the user is logged in and has the correct role


