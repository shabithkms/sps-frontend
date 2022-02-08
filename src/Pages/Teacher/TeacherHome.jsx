import React, { useEffect } from "react";
import SideBar from "../../Components/Teacher/TeacherHome/TeacherSideBar";
import Dashboard from "../../Components/Teacher/TeacherHome/TeacherDashboard";
import { useNavigate } from "react-router";

function TeacherHome() {
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
    <div className="d-flex">
      <SideBar dashboard={true} />
      <div className="p-3">
        <Dashboard />
      </div>
    </div>
  );
}

export default TeacherHome;
