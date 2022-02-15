import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Validation from '../../Constants/Validation';

function Login() {
  // Baser URL
  let url = process.env.REACT_APP_URL;

  const navigate = useNavigate();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  // Reviewer Login
  const doLogin = (data) => {
    try {
      axios
        .post(`${url}/reviewer/login`, data)
        .then((response) => {
          console.log(response.data.message);
          localStorage.setItem('reviewer', JSON.stringify(response.data.reviewer));
          navigate('/reviewer');
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          toast.error(err.response.data.errors);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-div container'>

      <div className='login shadow  bg-light rounded col-md-6 '>
        <div className='text-center'>
          <h1>Reviewer Login</h1>
        </div>

        <form onSubmit={handleSubmit(doLogin)}>
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
          {errors.Email && <span className='error'>{errors.Email.message}</span>}

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
          {errors.Password && <span className='error'>{errors.Password.message}</span>}

          <div className='text-center'>
            <button className='btn login-btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
