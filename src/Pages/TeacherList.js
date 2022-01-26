import React from "react";
import Sidebar from "../Components/AdminSidebar/Sidebar";
import TeacherTable from "../Components/TeacherList/TeacherTable";

function AdminHome(props) {
    console.log(props);
  return (
    <div className="d-flex">
      <Sidebar props={props}/>
      <div className="p-5">
        <TeacherTable />
      </div>
    </div>
  );
}

export default AdminHome;
