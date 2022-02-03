import React from "react";
import SideBar from "../Components/Teacher/TeacherHome/TeacherSideBar";
import StudentTable from "../Components/Teacher/StudentManagement/StudentTable";

function StudentManagement() {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="p-3">
        <StudentTable/>
      </div>
    </div>
  );
}

export default StudentManagement;
