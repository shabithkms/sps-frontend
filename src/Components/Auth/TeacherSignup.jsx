import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import { Alert } from "@mui/material";

function TeacherSignup() {
  const url = process.env.REACT_APP_URL;
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  let { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const doTeacherSignup = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log("err", formErrors);
    setIsSubmit(true);
  };

  const validateTeacher = () => {
    let data = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      token,
    };
    if (formValues.confirmPassword !== formValues.password) {
      return setError("password does not match");
    } else {
      try {
        axios
          .post(`${url}/teacher/signup`, data)
          .then((response) => {
            console.log(response.data.teacherData);
            localStorage.setItem(
              "teacher",
              JSON.stringify(response.data.teacherData)
            );
            navigate("/teacher/login");
          })
          .catch((err) => {
            setError(err.response.data.errors);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /\S+@\S+\.\S+/;
    const result = regex.test(values.email);
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 4) {
      errors.name = "Name must contain atleast 4 letters";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!result) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8 || values.password.length > 32) {
      errors.password = "Password must be in 8-32 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (
      values.confirmPassword.length < 8 ||
      values.confirmPassword.length > 32
    ) {
      errors.confirmPassword = "Password must be in 8-32 characters";
    }

    return errors;
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      validateTeacher();
    }
  }, [formErrors]);

  return (
    <div className="main-div container">
      <div className="signup shadow  bg-light rounded col-md-6 ">
        <h1 className="text-center">Teacher Signup</h1>

        {error ? (
          <Alert className="" severity="error">
            {error}
          </Alert>
        ) : (
          ""
        )}

        <form onSubmit={doTeacherSignup}>
          <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Fullname"
            type="text"
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            value={formValues.name}
            id="name"
          />
          {formErrors.name ? (
            <span className=" errors">{formErrors.name}</span>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            // type="Email"
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            value={formValues.email}
            id="Email"
          />
          {formErrors.email ? (
            <span className="errors">{formErrors.email}</span>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            value={formValues.password}
            id="password"
          />
          {formErrors.password ? (
            <span className="errors ">{formErrors.password}</span>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            onChange={(e) => {
              handleChange(e);
              setError("");
            }}
            value={formValues.confirmPassword}
            id="c_password"
          />
          {formErrors.confirmPassword ? (
            <span className=" errors">{formErrors.confirmPassword}</span>
          ) : (
            ""
          )}
          <div className="text-center">
            <button className="btn login-btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TeacherSignup;
