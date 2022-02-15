import { TextField } from '@mui/material';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import Validation from '../../Constants/Validation';

function ReviewerSignup() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  let { token } = useParams();
  let decoded = jwtDecode(token);

  // React hook form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Reviewer registration
  const doReviewerSignup = (data) => {
    try {
      if (data.Password === data.Confirm_Password) {
        if (decoded.Email === data.Email) {
          axios
            .post(`${url}/reviewer/signup`, data)
            .then((response) => {
              toast.success(response.data.message);
              setTimeout(() => {
                navigate('/reviewer/login');
              }, 500);
            })
            .catch((err) => {
              toast.error(err.response.data.errors);
            });
        } else {
          toast.error('Not a registered Email');
        }
      } else {
        toast.error('Password not same');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-div container'>
      <div className='signup shadow  bg-light rounded col-md-6 '>
        <h1 className='text-center'>Register</h1>
        <form onSubmit={handleSubmit(doReviewerSignup)}>
          <TextField
            margin='normal'
            fullWidth
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
            label='Fullname'
            type='text'
          />
          {errors.Name && <span className=' error'>{errors.Name.message}</span>}

          <TextField
            margin='normal'
            fullWidth
            {...register('Email', {
              required: Validation.Errors.REQUIRED_ERROR,
              pattern: {
                value: Validation.Patterns.EMAIL_PATTERN,
                message: Validation.Errors.INVALID_EMAIL,
              },
            })}
            label='Email'
            type='Email'
          />
          {errors.Email && <span className=' error'>{errors.Email.message}</span>}

          <TextField
            margin='normal'
            fullWidth
            {...register('Password', {
              required: Validation.Errors.REQUIRED_ERROR,
              minLength: {
                value: 8,
                message: Validation.MinLength(8),
              },
              maxLength: {
                value: 32,
                message: Validation.MaxLength(32),
              },
            })}
            label='Password'
            type='password'
          />
          {errors.Password && <span className=' error'>{errors.Password.message}</span>}

          <TextField
            margin='normal'
            fullWidth
            {...register('Confirm_Password', {
              required: Validation.Errors.REQUIRED_ERROR,
              minLength: {
                value: 8,
                message: Validation.MinLength(8),
              },
              maxLength: {
                value: 32,
                message: Validation.MaxLength(32),
              },
            })}
            label='Confirm password'
            type='password'
          />
          {errors.Confirm_Password && <span className=' error'>{errors.Confirm_Password.message}</span>}

          <div className='text-center'>
            <button className='btn login-btn'>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewerSignup;
