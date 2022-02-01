import React, { useEffect, useState } from "react";
import "./TeacherProfile.css";
import { useParams } from "react-router";
import axios from "axios";

function TeacherProfile() {
  let url = process.env.REACT_APP_URL;
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const getTeacherData = () => {
    try {
      axios
        .get(`${url}/teacher/getTeacherData/${id}`)
        .then((res) => {
          setTeacherData(res.data.teacherData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <div className="teacherProfile-mainDiv container">
      <div className="teacherProfile-div shadow  bg-light rounded col-md-6 ">
        <div className="text-center">
          <h2>Teacher Profile</h2>
        </div>
        <div className="pt-4 profile-details">
          <h6>Full Name : {teacherData.name ? teacherData.name : ""}</h6>
          <h6> Email : {teacherData.email ? teacherData.email : ""}</h6>
          <h6> Mobile : {teacherData.mobile ? teacherData.mobile : ""}</h6>
          <h6>Address : {teacherData.address ? teacherData.address : ""}</h6>
        </div>
        <div>
            <button className="btn login-btn">
                Edit
            </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
