import React, { useEffect, useState } from 'react';
import Profile from '../../components/Profile';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    no_tlpn: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile');
        const result = await response.json();
        setUser(result.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setMessage('Profile updated successfully');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Terjadi kesalahan pada server');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/profile/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_password: user.new_password })
      });

      if (response.ok) {
        setMessage('Password updated successfully');
      } else {
        setMessage('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Terjadi kesalahan pada server');
    }
  };

  return (
    <div className="container">
      <Profile
        user={user}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleChangePassword={handleChangePassword}
        message={message}
      />
    </div>
  );
};

export default ProfilePage;
