import React from "react";
import SideBar from "../Components/Teacher/TeacherHome/TeacherSideBar";
import Profile from "../Components/Teacher/TeacherProfile/TeacherProfile";

function TeacherProfile() {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="p-3">
        <Profile />
      </div>
    </div>
  );
}

export default TeacherProfile;
