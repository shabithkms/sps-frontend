import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/Auth/TeacherLogin";

function TeacherLogin() {
  let navigate = useNavigate();
  useEffect(() => {
    try {
      let teacher = JSON.parse(localStorage.getItem("teacher"));
      if (teacher) {
        navigate("/teacher");
      } else {
        navigate("/teacher/login");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("teacher");
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default TeacherLogin;
