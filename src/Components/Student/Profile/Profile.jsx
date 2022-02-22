import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactCrop from 'react-image-crop';
import { useNavigate } from 'react-router-dom';
import cropper from '../../../utils/cropperImage';
import './Profile.css';

function Profile() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [blob, setBlob] = useState(null);
  const [idProof, setIdProof] = useState(false);
  const [idModal, setIdModal] = useState(false);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    height: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    alignItems: 'center',
  };
  const idImgStyle = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
  };
  // Get student data from local storage
  let student = JSON.parse(localStorage.getItem('student'));

  const getCroppedImage = async () => {
    let fileName = student._id;
    if (crop.width !== 0) {
      let blob = await cropper.getCroppedImg(image, crop, fileName);
      setBlob(blob);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        setResult(base64data);
      };
      changePhoto();
    } else {
      toast.error('Please select area to crop');
    }
  };

  const viewIdProof = () => {
    setIdModal(true);
    setIdProof(true);
  };

  const changePhoto = () => {
    let newData = new FormData();
    newData.append('image', blob);
    newData.append('_id', student._id);
    console.log(newData);
    try {
      axios
        .post(`${url}/editPhoto`, newData)
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          localStorage.removeItem('student');
          localStorage.setItem('student', JSON.stringify(response.data.student));
          student = JSON.parse(localStorage.getItem('student'));
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

  return (
    <div className='container'>
      <div className='text-center mt-5'>
        <h2>My Profile</h2>
      </div>
      <div className='container main-container'>
        <div className=' profile-div justify-content-center  shadow'>
          <div className='flex-column-reverse row flex-lg-row container'>
            <div className='col-md-6 left-div mt-5'>
              <table className='student-profile-table'>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>
                      <span className='formData'>Name : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Name}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Domain : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Domain}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Batch : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Batch}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>DOB : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.DOB}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Age : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Age}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Gender : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Gender}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Email : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Email}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Mobile : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Mobile}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-6 image-section text-center'>
              <div className=''>
                {student.Profile ? (
                  <div>
                    <img src={student?.Profile} alt='' style={{ width: 150, height: 150, borderRadius: 500 }} />
                  </div>
                ) : (
                  <div>
                    <img className='editProfile' alt='' style={{ width: 120, height: 120, borderRadius: 500 }} />
                  </div>
                )}
                <div className='text-center mt-1'>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='raised-button-file'
                    multiple
                    onChange={(e) => {
                      setOpen(true);
                      setFile(URL.createObjectURL(e.target.files[0]));
                    }}
                    type='file'
                  />
                  <label htmlFor='raised-button-file'>
                    <Button variant='raised' component='span'>
                      Change
                    </Button>
                  </label>{' '}
                </div>
                <Modal
                  aria-labelledby='transition-modal-title'
                  aria-describedby='transition-modal-description'
                  open={open}
                  onClose={() => setOpen(false)}
                  closeAfterTransition
                  // BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style} className='container text-center'>
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
                            <button className='btn login-btn' onClick={changePhoto}>
                              Save
                            </button>
                          ) : (
                            <button className='btn login-btn' onClick={getCroppedImage}>
                              Crop image
                            </button>
                          )}
                        </div>
                      )}
                    </Box>
                  </Fade>
                </Modal>
                <Modal open={idModal} onClose={() => setIdModal(false)}>
                  <Box sx={idImgStyle}>
                    {idProof && <img src={student.ID_Proof} alt='' className='id-proof-bigImg' />}
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
          <hr />
          <div className='container'>
            <div className='down-div'>
              <table className='student-profile-table'>
                <thead></thead>
                <tbody>
                  <tr>
                    <th>
                      <span className='formData'>Father's Name : </span>
                    </th>
                    <td>
                      <span className='formData'> {student?.FatherName}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Father's Contact : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.FatherNo}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Mother's Name : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.MotherName}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Mother's Contact : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.MotherNo}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Guardian : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Guardian}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Relationship : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Relationship}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData '>Address : </span>
                    </th>
                    <td>
                      <span className='formData student-address'>{student?.Address}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Village : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Village}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Taluk : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Taluk}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Qualification : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Qualification}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>College / School : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.School}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Work Experience : </span>
                    </th>
                    <td>
                      <span className='formData'>{student?.Experience}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <span className='formData'>Govt ID : </span>
                    </th>
                    <td>
                      {student.ID_Proof ? (
                        <img src={student?.ID_Proof} className='id-proof' alt='Govt Id' onClick={viewIdProof} />
                      ) : (
                        <span className='formDta'>None</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='text-center'>
                <button
                  className='edit-profile-btn btn '
                  onClick={() => {
                    navigate('/editProfile');
                  }}
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
