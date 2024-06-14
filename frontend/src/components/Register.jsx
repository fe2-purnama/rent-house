import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ handleSubmit, handleChange, formData, message }) => {
  return (
    <div className="register-container">
      <h2 className='text-center'>Register</h2>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="nama_depan"
            placeholder="Enter first name"
            value={formData.nama_depan}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="nama_belakang"
            placeholder="Enter last name"
            value={formData.nama_belakang}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="no_tlpn"
            placeholder="Enter phone number"
            value={formData.no_tlpn}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicRole" className="mt-3">
          {/* <Form.Label>Role</Form.Label> */}
          <Form.Control
            type="text"
            name="role"
            placeholder="Enter role"
            value={formData.role=1}
            onChange={handleChange}
            required
            hidden
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-4">
          Register
        </Button>
      </Form>
      <style jsx="true">{`
        :root {
          --body-bg: #1C3988;
          --form-bg: #394383;
          --white: #ffffff;
          --main: #4c65bc;
          --main-light: #5e87f5;
          --main-dark: #5576d9;
          --gray-light: #EEEEEE;
          --gray: #5e87f5;
          --thin: 300;
          --normal: 400;
          --bold: 600;
          --br: 4px;
        }

        body {
          background: var(--body-bg);
          font-family: 'Titillium Web', sans-serif;
        }

        label {
          font-size: 18px;
        }

        label.active {
          color: var(--white);
        }

        input,
        textarea {
          font-size: 18px;
          display: block;
          width: 100%;
          padding: 10px;
          background: none;
          border: 1px solid var(--gray-light);
          color: var(--white);
          border-radius: var(--br);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        input:focus,
        textarea:focus {
          outline: 0;
          border-color: var(--main);
        }

        .button {
          border: 0;
          outline: none;
          border-radius: var (--br);
          padding: 15px 0;
          font-size: 1.5rem;
          font-weight: var (--bold);
          text-transform: uppercase;
          letter-spacing: .1em;
          background: var (--main);
          color: var (--white);
          transition: all 0.5s ease;
          display: block;
          width: 100%;
        }

        .button:hover,
        .button:focus {
          background: var (--main-dark);
        }

        .alert {
          border-radius: var (--br);
        }

        .register-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: var(--gray-light);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default Register;
