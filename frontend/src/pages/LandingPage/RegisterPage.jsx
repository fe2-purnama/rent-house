import React, { useState } from 'react';
import Register from '../../components/Register';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    no_tlpn: '',
    role: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama_depan, nama_belakang, email, password, no_tlpn, role=1 } = formData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      setMessage('Password harus memiliki simbol, angka, 1 huruf kapital, dan panjangnya minimal 8 karakter');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register/save', {  //cocokkin End point
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nama_depan, nama_belakang, email, password, no_tlpn, role })
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setMessage(result.message || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Terjadi kesalahan pada server');
    }
  };

  return (
    <div className="container">
      <Register
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        message={message}
      />
    </div>
  );
};

export default RegisterPage;
