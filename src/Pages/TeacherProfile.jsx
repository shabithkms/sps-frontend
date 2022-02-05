import React from "react";
import SideBar from "../Components/Teacher/TeacherHome/TeacherSideBar";
import Profile from "../Components/Teacher/TeacherProfile/TeacherProfile";

function TeacherProfile() {
  return (
    <div className="">
      <SideBar />
      <div className="">
        {/* <div> */}
        <Profile />
        {/* </div> */}
      </div>
    </div>
  );
}

export default TeacherProfile;
