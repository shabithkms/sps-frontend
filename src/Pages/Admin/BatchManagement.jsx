import React from "react";
import SideBar from "../../Components/Admin/AdminSidebar/Sidebar";
import Batches from "../../Components/Admin/BatchManagement/Batches";

function TeacherBatchManagement() {
  return (
    <div className="d-flex ">
      <SideBar />
      <div className="p-3">
        <Batches />
      </div>
    </div>
  );
}

export default TeacherBatchManagement;
