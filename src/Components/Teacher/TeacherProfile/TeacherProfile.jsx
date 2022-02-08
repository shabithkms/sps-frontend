import React, { useEffect, useState } from "react";
import "./TeacherProfile.css";
import { useParams, useNavigate } from "react-router";
import { Modal, Backdrop, Fade, Box, Button } from "@mui/material";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import cropper from "../../../utils/cropperImage";
import toast, { Toaster } from "react-hot-toast";

function TeacherProfile() {
  let navigate = useNavigate();
  let url = process.env.REACT_APP_URL;
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [blob, setBlob] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [teacherData, setTeacherData] = useState({});
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
  const getCroppedImage = async () => {
    let fileName = teacherData._id;
    if (crop.width !== 0) {
      let blob = await cropper.getCroppedImg(image, crop, fileName);
      console.log("blob", blob);
      setBlob(blob);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        setResult(base64data);
      };
      changePhoto();
    } else {
      toast.error("Please select area to crop");
    }
  };

  const changePhoto = () => {
    let newData = new FormData();
    newData.append("image", blob);
    newData.append("_id", teacherData._id);
    console.log(newData);
    try {
      axios
        .post(`${url}/teacher/editPhoto`, newData)
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          setBlob(null);
          setFile(null);
          setImage(null);
          setOpen(false);
          setResult(null);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    setOpen(true);
    setFile(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    getTeacherData();
  }, [open]);

  return (
    <div className="teacherProfile-mainDiv container">
      <div className="teacherProfile-div shadow  bg-light rounded col-md-6 ">
        <div className="text-center">
          <Toaster
            toastOptions={{
              style: {
                background: "black",
                color: "white",
              },
            }}
          />
          <h2>Teacher Profile</h2>
          {teacherData.profile ? (
            <div>
              <img
                src={teacherData.profile}
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
          <div className="text-center mt-3">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              onChange={(e) => {
                handleFileChange(e);
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
        <div className="pt-4 profile-details">
          <h6>Full Name : {teacherData.name ? teacherData.name : ""}</h6>
          <h6> Email : {teacherData.email ? teacherData.email : ""}</h6>
          <h6> Mobile : {teacherData.mobile ? teacherData.mobile : ""}</h6>
          <h6>Address : {teacherData.address ? teacherData.address : ""}</h6>
        </div>
        <div>
          <button
            className="btn edit-btn"
            onClick={() => {
              navigate(`/teacher/editProfile/${id}`);
            }}
          >
            Edit
          </button>
        </div>
      </div>
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
          <Box sx={style} className="container text-center">
            {file && (
              <div style={{ width: 300, height: 300 }}>
                <ReactCrop
                  src={file}
                  crop={crop}
                  onImageLoaded={setImage}
                  onChange={setCrop}
                  style={{ width: 300, height: 300 }}
                />
                {result ? (
                  <button className="btn login-btn" onClick={changePhoto}>
                    Save
                  </button>
                ) : (
                  <button className="btn login-btn" onClick={getCroppedImage}>
                    Crop image
                  </button>
                )}
              </div>
            )}
            {/* <div className="mb-4">
              <img
                src={teacherData.profile}
                alt=""
                style={{ width: 150, height: 150}}
              />
            </div> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TeacherProfile;
