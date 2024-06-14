import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan password harus diisi');
    } else {
      setError('');
      try {
        const response = await fetch('http://localhost:3000/login/auth', {  //Cocokkin backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Login successful:', result);
          localStorage.setItem('token', result.token);
          navigate('/');
        } else {
          setError(result.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Terjadi kesalahan pada server');
      }
    }
  };

  const handleRegisterRedirect = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2 className='text-center'>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-4">
          Login
        </Button>
      </Form>
      <Form onSubmit={handleRegisterRedirect} className="mt-3">
        <Button variant="link" type="submit" className="w-100">
          Anda belum punya akun? Daftar
        </Button>
      </Form>
      <style jsx="true">{`
        :root {
          --body-bg: #1C3988;
          --form-bg: #394383;
          --white: #ffffff;
          --main: #1C3988;
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
          border-radius: var(--br);
          padding: 15px 0;
          font-size: 1.5rem;
          font-weight: var(--bold);
          text-transform: uppercase;
          letter-spacing: .1em;
          background: var(--main);
          color: var(--white);
          transition: all 0.5s ease;
          display: block;
          width: 100%;
        }

        .button:hover,
        .button:focus {
          background: var(--main-dark);
        }

        .alert {
          border-radius: var(--br);
        }

        .login-container {
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

export default Login;
