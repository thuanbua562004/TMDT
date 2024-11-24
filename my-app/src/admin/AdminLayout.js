import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/admin';
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100 shadow-sm" style={{ width: '250px' }}>
        {/* Logo và tên Admin Panel */}
        <div className="text-center mb-4">
          <h4>Admin Panel</h4>
        </div>

        {/* Menu */}
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/home" className="nav-link text-light">
              <i className="bi bi-house-door-fill me-2"></i> Home
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/add" className="nav-link text-light">
              <i className="bi bi-plus-circle-fill me-2"></i> Add Product
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/history" className="nav-link text-light">
              <i className="bi bi-clock-history me-2"></i> History
            </Link>
          </li>
          <li className="nav-item">
            <Link onClick={logOut} to="#" className="nav-link text-light">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
          <div className="container-fluid">
            <span className="navbar-brand text-white">Admin Dashboard</span>
          </div>
        </nav>

        {/* Dashboard Content */}
      <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
