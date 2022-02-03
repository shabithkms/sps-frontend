import React from "react";
import TeacherSideBar from "../Components/Teacher/TeacherHome/TeacherSideBar";
import EditProfile from "../Components/Teacher/TeacherProfile/EditTeacherProfile";

function EditTeacherProfile() {
  return (
    <div className="d-flex">
      <TeacherSideBar />
      <div className="p-3">
        <EditProfile />
      </div>
    </div>
  );
}

export default EditTeacherProfile;
