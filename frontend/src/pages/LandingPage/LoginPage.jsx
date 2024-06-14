import React, { useState } from 'react';
import Login from '../../components/Login';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //apabila terjadi error
    console.log('Login submitted:', formData);
  };

  return (
    <div className="container">
      {/* <h2>Login</h2> */}
      <Login
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        message={message}
      />
    </div>
  );
};

export default LoginPage;
