import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { TextField } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import "./TeacherProfile.css";

function EditTeacherProfile() {
  let url = process.env.REACT_APP_URL;
  let navigate = useNavigate();

  const { id } = useParams();
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    image: "",
  };

  const [teacherData, setTeacherData] = useState(initialValues);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  // Get teacher data from the database
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

  // Update the edited data
  const updateData = () => {
    if (teacherData.name === "") {
      setError("This field is required");
    } else {
      let formData = {
        _id: teacherData._id,
        name: teacherData.name,
        email: teacherData.email,
        mobile: teacherData.mobile,
        address: teacherData.address,
      };
      try {
        axios.post(`${url}/teacher/editProfile`, formData).then((res) => {
          console.log(res.data.response);
          navigate(`/teacher/profile/${teacherData._id}`);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTeacherData();
  }, []);
  return (
    <div>
      <div className="teacherProfile-mainDiv container">
        <div className="teacherProfile-div shadow  bg-light rounded col-md-6 ">
          <div className="text-center mb-5x">
            <div>
              <h2>Edit Profile</h2>
            </div>
          </div>
          <div></div>
          <div className="pt-4 profile-details">
            <div className="">
              <div className="ml-5">
                <TextField
                  autoFocus
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Fullname"
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.name}
                  id="name"
                />
              </div>
            </div>
            <p>{error ? error : ""}</p>
            <div className="">
              <div className="ml-5">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  name="email"
                  label="Email"
                  type="email"
                  value={teacherData.email}
                  id="name"
                />
              </div>
            </div>
            <div className="">
              <div className="ml-5">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="mobile"
                  label="Mobile No"
                  type="number"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.mobile}
                  autoFocus
                  id="name"
                />
              </div>
            </div>
            <div className="">
              <div className="ml-5">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.address}
                  id="name"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn edit-btn"
              onClick={() => {
                updateData();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditTeacherProfile;
