// Import useState and useEffect from React
import React, { useState, useEffect } from 'react';
// Import axios for making HTTP requests
import axios from 'axios';

// Define the functional component App
function App() {
  // Define state variables for users and name
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  // useEffect hook to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Base URL for API requests
  const baseURL = 'http://localhost:5000';

  // Function to fetch all users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Function to add a new user
  const addUser = async () => {
    try {
      const response = await axios.post(`${baseURL}/users`, { name });
      console.log('User added successfully:', response.data);
      setName('');
      fetchUsers(); // Fetch users again to update the list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to delete a user by ID
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/users/${id}`);
      console.log('User deleted successfully:', response.data);
      fetchUsers(); // Fetch users again to update the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Array to store IDs of selected users for deletion
  const selectedUsers = [];

  // Function to handle selection of a user for deletion
  const handleSelectUser = (userId, checked) => {
    if (checked) {
      selectedUsers.push(userId);
    } else {
      const index = selectedUsers.indexOf(userId);
      if (index !== -1) {
        selectedUsers.splice(index, 1);
      }
    }
  };

  // Function to handle deletion of selected users
  const handleDeleteSelectedUsers = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete the selected users?')) {
      try {
        for (const userId of selectedUsers) {
          await deleteUser(userId);
        }
        selectedUsers.length = 0; // Clear selected users array
      } catch (error) {
        console.error('Error deleting selected users:', error);
      }
    }
  };

  // JSX content to render
  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Username"
      />
      <button onClick={addUser}>Add User</button>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{new Date(user.addedDate).toLocaleDateString()}</td>
              <td>{user.status}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleDeleteSelectedUsers}>Delete Selected Users</button>
    </div>
  );
}

// Export the App component as default
export default App;
