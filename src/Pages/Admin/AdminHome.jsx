import React, { useEffect } from "react";
import Sidebar from "../../Components/Admin/AdminSidebar/Sidebar";
import Dashboard from "../../Components/Admin/AdminDashboard/Dashboard";
import { useNavigate } from "react-router";

function AdminHome(props) {
  console.log(props);
  const navigate = useNavigate();
  useEffect(() => {
    let ADMIN = process.env.REACT_APP_ADMIN;
    let Admin = localStorage.getItem("Admin");
    console.log(Admin);
    if (Admin) {
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
    return () => {};
  }, []);

  return (
    <div className="d-flex">
      <Sidebar  />
      <div className="p-3">
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminHome;
