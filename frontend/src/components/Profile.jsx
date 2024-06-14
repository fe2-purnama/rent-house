import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = ({ user, handleChange, handleUpdate, handleChangePassword, message }) => {
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="nama_depan"
            value={user.nama_depan}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="nama_belakang"
            value={user.nama_belakang}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="no_tlpn"
            value={user.no_tlpn}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-4">
          Update Profile
        </Button>
      </Form>
      <Form onSubmit={handleChangePassword} className="mt-3">
        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="new_password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="warning" type="submit" className="w-100 mt-4">
          Change Password
        </Button>
      </Form>
      <style jsx="true">{`
        .profile-container {
          padding: 20px;
          background: #394383;
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default Profile;
