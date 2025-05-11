// src/components/ViewPolicies.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const ViewPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token'); // Customer's token

  useEffect(() => {
    // Fetch policies from the backend
    axios
      .get('http://localhost:5800/api/policies', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authorization
        },
      })
      .then((response) => {
        setPolicies(response.data.policies); // Store policies in state
      })
      .catch((error) => {
        console.error('Error fetching policies:', error);
      });
  }, [token]);

  const applyPolicy = async (policyId) => {
    try {
      const res = await fetch('http://localhost:5800/api/customer/apply-policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ policyId }), // Sending the policyId in the body
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Policy applied successfully!');
      } else {
        alert(data.error || 'Failed to apply policy');
      }
    } catch (error) {
      alert('Server error');
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Available Policies</h2>
      <ListGroup>
        {policies.map((policy) => (
          <ListGroup.Item key={policy.id}>
            <Card>
              <Card.Body>
                <Card.Title>{policy.policy_name}</Card.Title>
                <Card.Text>{policy.description}</Card.Text>
                <Card.Text>Coverage: ₹{policy.coverage_amount}</Card.Text>
                <Card.Text>Premium: ₹{policy.premium_amount}</Card.Text>
                <Button variant="primary" onClick={()=>applyPolicy(policy.id)}>Apply</Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ViewPolicies;
