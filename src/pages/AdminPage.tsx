
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Login from '@/components/admin/Login';

const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be environment-based

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Login 
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-wisesemi-dark">Admin Dashboard</h1>
        <p className="text-gray-600">Admin access granted</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome to Admin Panel</h2>
        <p className="text-gray-600">
          Content management is handled through markdown files in the project structure.
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
