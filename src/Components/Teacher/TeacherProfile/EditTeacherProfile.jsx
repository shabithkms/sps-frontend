import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { TextField } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import './TeacherProfile.css';
import toast, { Toaster } from 'react-hot-toast';

function EditTeacherProfile() {
  let url = process.env.REACT_APP_URL;
  let navigate = useNavigate();

  const { id } = useParams();
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    image: '',
  };

  const [teacherData, setTeacherData] = useState(initialValues);
  const [error, setError] = useState('');
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
    if (teacherData.name === '') {
      setError('This field is required');
    } else {
      let formData = {
        _id: teacherData._id,
        Name: teacherData.Name,
        Email: teacherData.Email,
        Mobile: teacherData.Mobile,
        Address: teacherData.Address,
      };
      try {
        axios.post(`${url}/teacher/editProfile`, formData).then((res) => {
          console.log(res.data.response);
          toast.success(res.data.response);
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
      <Toaster
        toastOptions={{
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />
      <div className='teacherProfile-mainDiv container'>
        <div className='teacherProfile-div shadow  bg-light rounded col-md-6 '>
          <div className='text-center mb-5x'>
            <div>
              <h2>Edit Profile</h2>
            </div>
          </div>
          <div></div>
          <div className='pt-4 profile-details'>
            <div className=''>
              <div className='ml-5'>
                <TextField
                  autoFocus
                  margin='normal'
                  required
                  fullWidth
                  name='Name'
                  label='Fullname'
                  type='text'
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.Name}
                  id='name'
                />
              </div>
            </div>
            <p>{error ? error : ''}</p>
            <div className=''>
              <div className='ml-5'>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  disabled
                  name='Email'
                  label='Email'
                  type='email'
                  value={teacherData.Email}
                  id='name'
                />
              </div>
            </div>
            <div className=''>
              <div className='ml-5'>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='Mobile'
                  label='Mobile No'
                  type='number'
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.Mobile}
                  autoFocus
                  id='name'
                />
              </div>
            </div>
            <div className=''>
              <div className='ml-5'>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='Address'
                  label='Address'
                  type='text'
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={teacherData.Address}
                  id='name'
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className='btn edit-btn'
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
