import { Button } from '@mui/material';
import React from 'react';
import './Profile.css';

function Profile() {
  // Get student data from local storage
  let student = JSON.parse(localStorage.getItem('student'));

  return (
    <div className='container'>
      <div className='text-center mt-5'>
        <h2>My Profile</h2>
      </div>
      <div className=' profile-div justify-content-center  shadow'>
        <div className='flex-column-reverse row flex-lg-row container'>
          <div className='col-md-6 left-div mt-5'>
            <table>
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
              {student ? (
                <div>
                  <img src={student?.ID_Proof} alt='' style={{ width: 150, height: 150, borderRadius: 500 }} />
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
                    // handleFileChange(e);
                  }}
                  type='file'
                />
                <label htmlFor='raised-button-file'>
                  <Button variant='raised' component='span'>
                    Change
                  </Button>
                </label>{' '}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Profile;
