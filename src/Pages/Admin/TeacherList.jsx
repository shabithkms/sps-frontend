import React from "react";
import Sidebar from "../../Components/Admin/AdminSidebar/Sidebar";
import TeacherTable from "../../Components/Admin/TeacherList/TeacherTable";

function AdminHome(props) {
  console.log(props);
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-5">
        <TeacherTable />
      </div>
    </div>
  );
}

export default AdminHome;
