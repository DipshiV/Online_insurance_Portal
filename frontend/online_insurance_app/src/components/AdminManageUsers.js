import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const adminToken = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:5800/api/admin/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    fetch(`http://localhost:5800/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchUsers(); // refresh the list
      })
      .catch((err) => {
        alert('Error deleting user');
        console.error(err);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                 
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminManageUsers;
