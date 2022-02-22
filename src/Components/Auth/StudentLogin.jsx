import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { update_student } from '../../Redux/studentSlice';
import './StudentSignup.css';

function Login() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const doLogin = (data) => {
    try {
      axios
        .post(`${url}/login`, data)
        .then((res) => {
          console.log(res.data.message);
          toast.success(res.data.message);
          localStorage.setItem('student', JSON.stringify(res.data.student));
          let student = JSON.parse(localStorage.getItem('student'));
          dispatch(update_student(student));
          navigate('/');
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

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
        <div className='student-login shadow  bg-light '>
          <h1 className='text-center signup-header'>
            Login to <span className='shade'>SPS.</span>{' '}
          </h1>

          <form onSubmit={handleSubmit(doLogin)}>
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
            {errors.Password ? <span className='error '>{errors.Password.message}</span> : ''} <br />
            <span className='redirect'>Not registered? </span>{' '}
            <span
              className='signup-link'
              onClick={() => {
                navigate('/signup');
              }}
            >
              Register now
            </span>
            <div className='text-center'>
              <button className='btn login-btn-student'>
                <span className='btn-text'>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
