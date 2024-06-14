import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="userlist-container">
      <h2>User List</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.user_id}>
              <td>{index + 1}</td>
              <td>{user.nama_depan}</td>
              <td>{user.nama_belakang}</td>
              <td>{user.email}</td>
              <td>{user.no_tlpn}</td>
              <td>{user.role}</td>
              <td>{user.last_login}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user.user_id)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user.user_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style jsx="true">{`
        .userlist-container {
          padding: 20px;
          background: #394383;
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #ffffff;
        }
        .btn-warning {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default UserList;
