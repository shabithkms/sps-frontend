import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import Validation from '../../Constants/Validation';

function Login() {
  const navigate = useNavigate();

  // React hook form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const doTeacherLogin = (data) => {
    let url = process.env.REACT_APP_URL;
    try {
      axios
        .post(`${url}/teacher/login`, data)
        .then((response) => {
          console.log(response.data.teacher);
          localStorage.setItem('teacher', JSON.stringify(response.data.teacher));
          navigate('/teacher');
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data.errors  )
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-div container'>
      <div className='login shadow  bg-light rounded col-md-6 '>
        <h1 className='text-center'>
          <span className='shade'>Teacher</span> Login
        </h1>
        <form onSubmit={handleSubmit(doTeacherLogin)}>
          <TextField
            margin='normal'
            fullWidth
            name='Email'
            {...register('Email', {
              required: Validation.Errors.REQUIRED_ERROR,
              pattern: {
                value: Validation.Patterns.EMAIL_PATTERN,
                message: Validation.Errors.INVALID_EMAIL,
              },
            })}
            label='Email'
          />
          {errors.Email && <span className='error'>{errors.Email.message}</span>}
          <TextField
            margin='normal'
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
            fullWidth
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
