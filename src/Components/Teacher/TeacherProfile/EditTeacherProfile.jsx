import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { TextField, Fade, Box, Modal, Backdrop } from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./TeacherProfile.css";
import cropper from "../../../utils/cropperImage";

function EditTeacherProfile() {
  let url = process.env.REACT_APP_URL;
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  };
  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 360,
    height: 450,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    alignItems: "center",
  };
  const [teacherData, setTeacherData] = useState(initialValues);
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [blob, setBlob] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
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

  // Image cropping
  const handleFileChange = (e) => {
    setOpen(true);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const getCroppedImage = async () => {
    let fileName = teacherData._id;
    console.log(fileName);
    let blob = await cropper.getCroppedImg(image, crop, fileName);
    setBlob(blob);
    setOpen(false);
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      setResult(base64data);
    };
  };

  // Update the edited data
  const updateData = () => {
    // let data = new FormData();
    // data.append("image", blob);
    if (teacherData.name === "") {
      setError("This field is required");
    } else {
      let formData = new FormData();
      console.log(formData, "data");
      formData.append("name", teacherData.name);
      formData.append("email", teacherData.email);
      formData.append("phone", teacherData.phone);
      formData.append("address", teacherData.address);
      formData.append("image", blob);
      try {
        axios.post(`${url}/teacher/editProfile`, formData).then((res) => {
          console.log(res.data);
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
            <div className="editProfileMain">
              <div>
                <input
                  type="file"
                  name="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            {/* Cropped image showing */}
            {result && (
              <div className="p-3">
                <div>
                  <img
                    style={{ width: 200, height: 200 }}
                    src={result}
                    alt="Cropped "
                    className="img-fluid "
                  />
                </div>
                <button
                  className="btn  ml-2"
                  onClick={() => {
                    updateData();
                  }}
                >
                  Save
                </button>
                <button
                  className="btn btn-light ml-2"
                  onClick={() => {
                    setResult(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
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
      {file && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container ">
              {file && (
                <div style={{ width: 300, height: 300 }}>
                  <ReactCrop
                    src={file}
                    crop={crop}
                    onImageLoaded={setImage}
                    onChange={setCrop}
                    style={{ width: 300, height: 300 }}
                  />
                  <button className="btn login-btn" onClick={getCroppedImage}>
                    Crop image
                  </button>
                </div>
              )}
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}

export default EditTeacherProfile;
