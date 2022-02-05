import React from "react";
import SideBar from "../Components/Teacher/TeacherHome/TeacherSideBar";
import Batches from "../Components/Teacher/BatchManagement/Batches";

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
