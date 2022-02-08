import React, { useState } from "react";
import "./Profile.css";
import { Button } from "@mui/material";

function Profile() {
  const [student, setStudent] = useState(null);
  return (
    <div className="container">
      <div className="text-center mt-2">
        <h2>My Profile</h2>
      </div>
      <div className=" profile-div col-md-12 row shadow">
        <div className="col-md-8 left-div">
          <p>Name : Muhammed Shabith K</p>
        </div>
        <div className="col-md-4">
          <div className="mt-3">
          {student ? (
            <div>
              <img
                // src={teacherData.profile}
                alt=""
                style={{ width: 150, height: 150, borderRadius: 500 }}
              />
            </div>
          ) : (
            <div>
              <img
                className="editProfile"
                alt=""
                style={{ width: 120, height: 120, borderRadius: 500 }}
              />
            </div>
          )}
          </div>
          <div className="text-center mt-1">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              onChange={(e) => {
                // handleFileChange(e);
              }}
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                Change
              </Button>
            </label>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
