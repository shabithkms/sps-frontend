import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { adminLogin } from '../../api/adminApi';
import Validation from '../../Constants/Validation';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const doAdminLogin = (data) => {
    adminLogin(data).then((res) => {
      navigate('/admin');
    });
  };

  return (
    <div className='main-div container'>
      <div className='login shadow  bg-light rounded col-md-6 '>
        <h1 className='text-center'>Admin Login</h1>
        <form onSubmit={handleSubmit(doAdminLogin)}>
          <TextField
            margin='normal'
            label='Email'
            fullWidth
            {...register('Email', {
              required: Validation.Errors.REQUIRED_ERROR,
              pattern: {
                value: Validation.Patterns.EMAIL_PATTERN,
                message: Validation.Errors.INVALID_EMAIL,
              },
            })}
          />

          {errors.Email && <span className='error'>{errors.Email.message}</span>}
          <TextField
            margin='normal'
            fullWidth
            label='Password'
            type='password'
            {...register('Password', {
              required: Validation.Errors.REQUIRED_ERROR,
              minLength: {
                value: 5,
                message: Validation.MinLength(5),
              },
              maxLength: {
                value: 32,
                message: Validation.MaxLength(32),
              },
            })}
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
