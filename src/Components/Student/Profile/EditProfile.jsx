import React, { useState } from "react";
import "./Profile.css";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
function EditProfile() {
  let student = localStorage.getItem("student");
  console.log(student);
  const url = process.env.REACT_APP_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const editProfile = (data) => {
    console.log(data);
    try {
      axios.post(`${url}/editProfile`, data).then((res) => {
        console.log(res.data.message);
      });
    } catch (error) {}
  };
  return (
    <div className="container edit-profile-main">
      <div className="shadow  form-container">
        <form onSubmit={handleSubmit(editProfile)}>
          <table className="w-100">
            <tr>
              <th>
                {" "}
                <span>Name : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  autoCapitalize="on"
                  {...register("Name", {
                    required: "This field is required",
                    minLength: {
                      value: 4,
                      message: "Minimum 4 characters required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum 20 characters allowed",
                    },
                  })}
                  label="Name"
                  type="Text"
                  id="Name"
                />
                {errors.Name && (
                  <span className="error">{errors.Name.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>Domain : </th>
              <td>
                <FormControl fullWidth className="mt-3">
                  <InputLabel id="demo-simple-select-label">
                    Select Domain
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="select students"
                  >
                    <MenuItem selected>Select Domain</MenuItem>
                    <MenuItem value={"Mern stack"}>Mern Stack</MenuItem>
                    <MenuItem value={"Flutter"}>Flutter</MenuItem>
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>DOB : </th>
              <td className="row">
                <div className="col-md-6">
                  <input
                    type="date"
                    {...register("DOB", {
                      required: "This field is required",
                      max: {
                        value: "01-01-2004",
                        message: "Select a date before 2004",
                      },
                    })}
                    className="form-control mt-3"
                  />
                  {errors.DOB && (
                    <span className="error">{errors.DOB.message}</span>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Age : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  autoCapitalize="on"
                  {...register("Age", {
                    required: "This field is required",
                    min: {
                      value: 18,
                      message: "Minimum age is 18",
                    },
                  })}
                  label="Age"
                  type="Number"
                />
                {errors.Age && (
                  <span className="error">{errors.Age.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>Gender : </th>
              <td>
                <FormControl fullWidth className="mt-3">
                  <InputLabel id="demo-simple-select-label">
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("Gender", {
                      required: "This field is required",
                    })}
                    label="select Gender"
                  >
                    <MenuItem value="" selected>
                      Select Gender
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                  {errors.Gender && (
                    <span className="error">{errors.Gender.message}</span>
                  )}
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>
                <span>Email : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  autoCapitalize="on"
                  {...register("Email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  label="Email"
                  type="Text"
                />
                {errors.Email && (
                  <span className="error">{errors.Email.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>
                <span>Mobile : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  autoCapitalize="on"
                  {...register("Mobile", {
                    required: "This field is required",
                    minLength: {
                      value: 10,
                      message: "Minimum length is 10",
                    },
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 numbers allowed",
                    },
                  })}
                  label="Mobile"
                  type="Number"
                />
                {errors.Mobile && (
                  <span className="error">{errors.Mobile.message}</span>
                )}
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Father's Name : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  autoCapitalize="on"
                  label="Father's Name"
                  type="Text"
                  {...register("FatherName", {})}
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Father's No : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("FatherNo")}
                  label="Father's No"
                  type="Number"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Mother's Name : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("MotherName")}
                  label="Mother's Name"
                  type="Text"
                  id="Name"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Mother's No : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("MotherNo")}
                  label="Mother's Number"
                  type="Number"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Guardian : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Guardian")}
                  label="Guardian"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Relationship : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Relationship")}
                  label="Relationship"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Address : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Address")}
                  label="Address"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Village : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Village")}
                  label="Village"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Taluk : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Taluk")}
                  label="Taluk"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Qualification : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Qualification")}
                  label="Qualification"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>School/College : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  {...register("School/College")}
                  fullWidth
                  label="School/College"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>
                {" "}
                <span>Work experience (if any) : </span>
              </th>
              <td>
                <TextField
                  margin="normal"
                  fullWidth
                  {...register("Experience")}
                  label="Work Experience"
                  type="Text"
                />
              </td>
            </tr>
            <tr>
              <th>Payment Method : </th>
              <td>
                <FormControl fullWidth className="mt-3">
                  <InputLabel id="demo-simple-select-label">
                    Select Payment
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select payment method"
                    {...register("PaymentMethod")}
                  >
                    <MenuItem selected>Select Payment</MenuItem>
                    <MenuItem value={"ISA"}>ISA</MenuItem>
                    <MenuItem value={"Upfront"}>Upfront</MenuItem>
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>Govt ID : </th>
              <td>
                <input
                  type="file"
                  className="mt-3 form-control"
                  accept="image/*"
                />
              </td>
            </tr>
          </table>
          <div className="text-center mt-4 mb-3">
            <button className="btn login-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
