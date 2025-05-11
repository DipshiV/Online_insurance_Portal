import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch the contact messages when the component is mounted
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5800/api/admin/contact-messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // JWT Token for authentication
          }
        });
        setMessages(response.data.messages); // Set the messages to state
      } catch (error) {
        console.error('There was an error fetching the messages!', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Container style={{ paddingTop: '60px' }}>
      <Row className="justify-content-center mb-5">
        <Col md={8} className="text-center">
          <h2 className="mb-3 fw-bold">Contact Messages</h2>
          <p className="text-muted fs-5">
            Here are all the messages submitted by customers.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="p-4 shadow rounded-4 border-0">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <tr key={msg.id}>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.subject}</td>
                      <td>{msg.message}</td>
                      <td>{new Date(msg.created_at).toLocaleString()}</td> {/* Assuming created_at is in the response */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No messages found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminContactMessages;
