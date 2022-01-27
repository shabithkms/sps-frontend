import React from "react";
import Login from "../Components/TeacherLogin/TeacherLogin";

function TeacherLogin() {
  return (
    <div>
      <Login Teacher={true} />
    </div>
  );
}

export default TeacherLogin;
