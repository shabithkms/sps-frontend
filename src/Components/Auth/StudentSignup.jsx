import React, { useState, useEffect } from "react";
import "./StudentSignup.css";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const url = process.env.REACT_APP_URL;

  const [error, setError] = useState("");
  const navigate = useNavigate();
  let { token } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const doSignup = (data) => {
    if (data.Password !== data.Confirm_Password) {
      toast.error("Passwords not same");
    } else {
      try {
        axios
          .post(`${url}/signup`, data)
          .then((res) => {
            console.log(res.data.message);
            toast.success(res.data.message)
            setTimeout(() => {
              navigate('/login')
            }, 1500);
          })
          .catch((err) => {
            console.log(err.response.data.errors);
            toast.error(err.response.data.errors)
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="sign row flex-column flex-lg-row">
      <Toaster
        toastOptions={{
          style: {
            background: "black",
            color: "white",
          },
        }}
      />
      <div className="left col-md-5">
        <div className="container">
          <div className="logo">
            <h1 className="logo-signup">SPS.</h1>
          </div>
          <div className="quote">
            <h1 className="build">Build your Dream Career With Us.</h1>
          </div>
        </div>
      </div>

      <div className="right  col-md-7">
        <div className="student-signup shadow  bg-light   ">
          <h1 className="text-center signup-header"> Register</h1>

          {error ? (
            <Alert className="" severity="error">
              {error}
            </Alert>
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit(doSignup)}>
            <TextField
              margin="normal"
              fullWidth
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
              label="Fullname"
              type="text"
              id="name"
            />
            {errors.Name ? (
              <span className=" error">{errors.Name.message}</span>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              fullWidth
              {...register("Email", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
              label="Email"
              id="Email"
            />
            {errors.Email ? (
              <span className=" error">{errors.Email.message}</span>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              fullWidth
              {...register("Password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
              })}
              label="Password"
              type="password"
              id="password"
            />
            {errors.Password ? (
              <span className="error ">{errors.Password.message}</span>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              fullWidth
              {...register("Confirm_Password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
              })}
              label="Confirm password"
              type="password"
            />
            {errors.Confirm_Password ? (
              <span className=" error">{errors.Confirm_Password.message}</span>
            ) : (
              ""
            )}
            <div className="text-center">
              <button className="btn login-btn">
                <span className="btn-text">Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;