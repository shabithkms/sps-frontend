import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Validation from '../../../Constants/Validation';
import './Profile.css';

function EditProfile() {
  const url = process.env.REACT_APP_URL;
  const [file, setFile] = useState(null);
  let student = JSON.parse(localStorage.getItem('student'));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Function for editing profile
  const editProfile = (data) => {
    console.log(data);
    try {
      data._id = student._id;
      let studentData = new FormData();
      console.log(data.Name);
      studentData.append('Name', data.Name);
      studentData.append('Domain', data.Domain);
      studentData.append('DOB', data.DOB);
      studentData.append('Age', data.Age);
      studentData.append('Gender', data.Gender);
      studentData.append('Email', student.Email);
      studentData.append('Mobile', data.Mobile);
      studentData.append('FatherName', data.FatherName);
      studentData.append('FatherNo', data.FatherNo);
      studentData.append('MotherName', data.MotherName);
      studentData.append('MotherNo', data.MotherNo);
      studentData.append('Guardian', data.Guardian);
      studentData.append('Relationship', data.Relationship);
      studentData.append('Address', data.Address);
      studentData.append('Village', data.Village);
      studentData.append('Taluk', data.Taluk);
      studentData.append('Qualification', data.Qualification);
      studentData.append('School', data.School);
      studentData.append('Experience', data.Experience);
      studentData.append('PaymentMethod', data.PaymentMethod);
      studentData.append('ID_Proof', file);
      console.log(file);
      axios
        .post(`${url}/editProfile`, studentData)
        .then((res) => {
          toast.success(res.data.message);
          console.log(res.data.message);
          console.log(res.data.student);
          localStorage.removeItem('student');
          localStorage.setItem('student', JSON.stringify(res.data.student));
        })
        .catch((err) => {
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container edit-profile-main'>
      <Toaster
        toastOptions={{
          style: {
            background: 'black',
            color: 'white',
          },
        }}
      />
      <div className='shadow  form-container'>
        <form onSubmit={handleSubmit(editProfile)}>
          <table className='w-100'>
            <tbody>
              <tr>
                <th>
                  {' '}
                  <span>Name : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    name='Name'
                    fullWidth
                    defaultValue={student?.Name}
                    {...register('Name', {
                      required: Validation.Errors.REQUIRED_ERROR,
                      minLength: {
                        value: 4,
                        message: Validation.MinLength(4),
                      },
                      maxLength: {
                        value: 20,
                        message: Validation.MaxLength(20),
                      },
                    })}
                    label='Name'
                    type='Text'
                    id='Name'
                  />
                  {errors.Name && <span className='error'>{errors.Name.message}</span>}
                </td>
              </tr>
              <tr>
                <th>Domain : </th>
                <td>
                  <FormControl fullWidth className='mt-3'>
                    <InputLabel id='demo-simple-select-label'>Select Domain</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='select students'
                      defaultValue={student?.Domain}
                      {...register('Domain', {
                        required: Validation.Errors.REQUIRED_ERROR,
                      })}
                    >
                      <MenuItem selected>Select Domain</MenuItem>
                      <MenuItem value={'Mern stack'}>Mern Stack</MenuItem>
                      <MenuItem value={'Flutter'}>Flutter</MenuItem>
                    </Select>
                    {errors.Domain && <span className='error'>{errors.Domain.message}</span>}
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>DOB : </th>
                <td className='row'>
                  <div className='col-md-6'>
                    <input
                      type='date'
                      defaultValue={student?.DOB}
                      {...register('DOB', {
                        required: Validation.Errors.REQUIRED_ERROR,
                        max: {
                          value: '01-01-2004',
                          message: 'Select a date before 2004',
                        },
                      })}
                      className='form-control mt-3'
                    />
                    {errors.DOB && <span className='error'>{errors.DOB.message}</span>}
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Age : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Age}
                    {...register('Age', {
                      required: Validation.Errors.REQUIRED_ERROR,
                      min: {
                        value: 18,
                        message: Validation.Min(18),
                      },
                    })}
                    label='Age'
                    type='Number'
                  />
                  {errors.Age && <span className='error'>{errors.Age.message}</span>}
                </td>
              </tr>
              <tr>
                <th>Gender : </th>
                <td>
                  <FormControl fullWidth className='mt-3'>
                    <InputLabel id='demo-simple-select-label'>Select Gender</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      defaultValue={student?.Gender}
                      {...register('Gender', {
                        required: Validation.Errors.REQUIRED_ERROR,
                      })}
                      label='select Gender'
                    >
                      <MenuItem selected>Select Gender</MenuItem>
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                    {errors.Gender && <span className='error'>{errors.Gender.message}</span>}
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Email : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    disabled
                    defaultValue={student?.Email}
                    label='Email'
                    type='Text'
                  />
                </td>
              </tr>
              <tr>
                <th>
                  <span>Mobile : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Mobile}
                    {...register('Mobile', {
                      required: Validation.Errors.REQUIRED_ERROR,
                      minLength: {
                        value: 10,
                        message: Validation.MinLength(10),
                      },
                      maxLength: {
                        value: 10,
                        message: Validation.MaxLength(10),
                      },
                    })}
                    label='Mobile'
                    type='Number'
                  />
                  {errors.Mobile && <span className='error'>{errors.Mobile.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Father's Name : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    label="Father's Name"
                    type='Text'
                    defaultValue={student?.FatherName}
                    {...register('FatherName', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                  />
                  {errors.FatherName && <span className='error'>{errors.FatherName.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Father's No : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.FatherNo}
                    {...register('FatherNo', {
                      required: Validation.Errors.REQUIRED_ERROR,
                      minLength: {
                        value: 10,
                        message: Validation.MinLength(10),
                      },
                      maxLength: {
                        value: 10,
                        message: Validation.MaxLength(10),
                      },
                    })}
                    label="Father's No"
                    type='Number'
                  />
                  {errors.FatherNo && <span className='error'>{errors.FatherNo.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Mother's Name : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.MotherName}
                    {...register('MotherName', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label="Mother's Name"
                    type='Text'
                    id='Name'
                  />
                  {errors.MotherName && <span className='error'>{errors.MotherName.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Mother's No : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.MotherNo}
                    {...register('MotherNo', {
                      required: Validation.Errors.REQUIRED_ERROR,
                      minLength: {
                        value: 10,
                        message: Validation.MinLength(10),
                      },
                      maxLength: {
                        value: 10,
                        message: Validation.MaxLength(10),
                      },
                    })}
                    label="Mother's Number"
                    type='Number'
                  />
                  {errors.MotherNo && <span className='error'>{errors.MotherNo.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Guardian : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Guardian}
                    {...register('Guardian', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Guardian'
                    type='Text'
                  />
                  {errors.Guardian && <span className='error'>{errors.Guardian.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Relationship : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Relationship}
                    {...register('Relationship', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Relationship'
                    type='Text'
                  />
                  {errors.Relationship && <span className='error'>{errors.Relationship.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Address : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Address}
                    {...register('Address', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Address'
                    type='Text'
                  />
                  {errors.Address && <span className='error'>{errors.Address.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Village : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Village}
                    {...register('Village', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Village'
                    type='Text'
                  />
                  {errors.Village && <span className='error'>{errors.Village.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Taluk : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Taluk}
                    {...register('Taluk', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Taluk'
                    type='Text'
                  />
                  {errors.Taluk && <span className='error'>{errors.Taluk.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Qualification : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Qualification}
                    {...register('Qualification', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Qualification'
                    type='Text'
                  />
                  {errors.Qualification && <span className='error'>{errors.Qualification.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>School/College : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    {...register('School', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    defaultValue={student?.School}
                    fullWidth
                    label='School/College'
                    type='Text'
                  />
                  {errors.School && <span className='error'>{errors.School.message}</span>}
                </td>
              </tr>
              <tr>
                <th>
                  {' '}
                  <span>Work experience (if any) : </span>
                </th>
                <td>
                  <TextField
                    margin='normal'
                    fullWidth
                    defaultValue={student?.Experience}
                    {...register('Experience', {
                      required: Validation.Errors.REQUIRED_ERROR,
                    })}
                    label='Work Experience'
                    type='Text'
                  />
                  {errors.Experience && <span className='error'>{errors.Experience.message}</span>}
                </td>
              </tr>
              <tr>
                <th>Payment Method : </th>
                <td>
                  <FormControl fullWidth className='mt-3'>
                    <InputLabel id='demo-simple-select-label'>Select Payment</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Select payment method'
                      defaultValue={student?.PaymentMethod}
                      {...register('PaymentMethod', {
                        required: Validation.Errors.REQUIRED_ERROR,
                      })}
                    >
                      <MenuItem selected>Select Payment</MenuItem>
                      <MenuItem value={'ISA'}>ISA</MenuItem>
                      <MenuItem value={'Upfront'}>Upfront</MenuItem>
                    </Select>
                    {errors.PaymentMethod && <span className='error'>{errors.PaymentMethod.message}</span>}
                  </FormControl>
                </td>
              </tr>
              <tr>
                <th>Govt ID : </th>
                <td>
                  <input
                    type='file'
                    className='mt-3 form-control'
                    accept='image/*'
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                  {errors.ID_Card && <span className='error'>{errors.ID_Card.message}</span>}
                </td>
              </tr>
            </tbody>
          </table>
          <div className='text-center mt-4 mb-3'>
            <button className='btn login-btn'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
