import React, { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/userlist');
        const result = await response.json();
        setUsers(result.users);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/userlist/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/userlist/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setUsers(users.filter(user => user.user_id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default UserListPage;
