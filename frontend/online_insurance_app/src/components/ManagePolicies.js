import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:5800/api/view/policies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPolicies(response.data.policies);
    } catch (error) {
      console.error('Failed to fetch policies:', error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    try {
      await axios.delete(`http://localhost:5800/api/policy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPolicies(); // Refresh list
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (policy) => {
    setSelectedPolicy(policy);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5800/api/policy/${selectedPolicy.id}`, selectedPolicy, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowEditModal(false);
      fetchPolicies();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Manage Policies</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Coverage</th>
            <th>Premium</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.policy_name}</td>
              <td>₹{policy.coverage_amount}</td>
              <td>₹{policy.premium_amount}</td>
              <td>{policy.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(policy)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(policy.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Policy Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedPolicy?.policy_name || ''}
                onChange={(e) =>
                  setSelectedPolicy({ ...selectedPolicy, policy_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Coverage Amount</Form.Label>
              <Form.Control
                type="number"
                value={selectedPolicy?.coverage_amount || ''}
                onChange={(e) =>
                  setSelectedPolicy({ ...selectedPolicy, coverage_amount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Premium Amount</Form.Label>
              <Form.Control
                type="number"
                value={selectedPolicy?.premium_amount || ''}
                onChange={(e) =>
                  setSelectedPolicy({ ...selectedPolicy, premium_amount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedPolicy?.description || ''}
                onChange={(e) =>
                  setSelectedPolicy({ ...selectedPolicy, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagePolicies;
