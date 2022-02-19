import { TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { StudentSignup } from '../../utils/Signup';
import './StudentSignup.css';

function Signup() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const doSignup = (data) => {
    let endPoint = `${url}/signup`;
    return new Promise(() => {
      StudentSignup(data, endPoint)
        .then((response) => {
          console.log(response.data);
          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.errors);
        });
    });
  };

  return (
    <div className='sign row  flex-lg-row'>
      <div className='left col-md-5 d-none d-md-block'>
        <div className='container'>
          <div className='logo'>
            <h1 className='logo-signup'>SPS.</h1>
          </div>
          <div className='quote'>
            <h1 className='build'>Build your Dream Career With Us.</h1>
          </div>
        </div>
      </div>

      <div className='right  col-md-7'>
        <div className='student-signup shadow  bg-light   '>
          <h1 className='text-center signup-header'>
            {' '}
            Register to <span className='shade'>SPS.</span>{' '}
          </h1>

          <form onSubmit={handleSubmit(doSignup)}>
            <TextField
              margin='normal'
              fullWidth
              {...register('Name', {
                required: 'This field is required',
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters required',
                },
                maxLength: {
                  value: 20,
                  message: 'Maximum 20 characters allowed',
                },
              })}
              label='Fullname'
              type='text'
              id='name'
            />
            {errors.Name ? <span className=' error'>{errors.Name.message}</span> : ''}
            <TextField
              margin='normal'
              fullWidth
              {...register('Email', {
                required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
              label='Email'
              id='Email'
            />
            {errors.Email ? <span className=' error'>{errors.Email.message}</span> : ''}
            <TextField
              margin='normal'
              fullWidth
              {...register('Password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 characters required',
                },
                maxLength: {
                  value: 20,
                  message: 'Maximum 20 characters allowed',
                },
              })}
              label='Password'
              type='password'
              id='password'
            />
            {errors.Password ? <span className='error '>{errors.Password.message}</span> : ''}
            <TextField
              margin='normal'
              fullWidth
              {...register('Confirm_Password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 characters required',
                },
                maxLength: {
                  value: 20,
                  message: 'Maximum 20 characters allowed',
                },
              })}
              label='Confirm password'
              type='password'
            />
            {errors.Confirm_Password ? <span className=' error'>{errors.Confirm_Password.message}</span> : ''}
            <br />
            <span className='redirect'>Already registered? </span>{' '}
            <span
              className='signup-link'
              onClick={() => {
                navigate('/login');
              }}
            >
              Login now
            </span>
            <div className='text-center'>
              <button className='btn login-btn-student'>
                <span className='btn-text'>Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
