import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import Validation from '../../Constants/Validation';
import { Signup } from '../../utils/Signup';

function ReviewerSignup() {
  const url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  let { token } = useParams();

  // React hook form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Reviewer registration
  const doReviewerSignup = (data) => {
    let endPoint = `${url}/reviewer/signup`;
    return new Promise(() => {
      Signup(data, token, endPoint)
        .then((response) => {
          navigate('/reviewer');
        })
        .catch((err) => {
          toast.error(err.errors);
        });
    });
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
