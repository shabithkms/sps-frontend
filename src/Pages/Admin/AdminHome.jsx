import React from 'react';
import Dashboard from '../../Components/Admin/AdminDashboard/Dashboard';
import Sidebar from '../../Components/Admin/AdminSidebar/Sidebar';

function AdminHome() {
  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='p-3'>
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminHome;
