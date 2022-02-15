import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import { Alert } from '@mui/material';

function TeacherSignup() {
  const url = process.env.REACT_APP_URL;
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  let { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const doTeacherSignup = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    console.log('err', formErrors);
    setIsSubmit(true);
  };

  const validateTeacher = () => {
    let data = {
      Name: formValues.Name,
      Email: formValues.Email,
      Password: formValues.Password,
      token,
    };
    if (formValues.confirmPassword !== formValues.password) {
      return setError('password does not match');
    } else {
      try {
        axios
          .post(`${url}/teacher/signup`, data)
          .then((response) => {
            console.log(response.data.teacherData);
            localStorage.setItem(
              'teacher',
              JSON.stringify(response.data.teacherData)
            );
            navigate('/teacher/login');
          })
          .catch((err) => {
            setError(err.response.data.errors);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /\S+@\S+\.\S+/;
    const result = regex.test(values.Email);
    if (!values.Name) {
      errors.name = 'Name is required';
    } else if (values.Name.length < 4) {
      errors.name = 'Name must contain atleast 4 letters';
    }
    if (!values.Email) {
      errors.email = 'Email is required';
    } else if (!result) {
      errors.email = 'Invalid email';
    }
    if (!values.Password) {
      errors.password = 'Password is required';
    } else if (values.Password.length < 8 || values.Password.length > 32) {
      errors.password = 'Password must be in 8-32 characters';
    }
    if (!values.Confirm_Password) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (
      values.Confirm_Password.length < 8 ||
      values.Confirm_Password.length > 32
    ) {
      errors.confirmPassword = 'Password must be in 8-32 characters';
    }

    return errors;
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      validateTeacher();
    }
  }, [formErrors]);

  return (
    <div className='main-div container'>
      <div className='signup shadow  bg-light rounded col-md-6 '>
        <h1 className='text-center'>Teacher Signup</h1>

        {error ? (
          <Alert className='' severity='error'>
            {error}
          </Alert>
        ) : (
          ''
        )}

        <form onSubmit={doTeacherSignup}>
          <TextField
            margin='normal'
            fullWidth
            name='Name'
            label='Fullname'
            type='text'
            onChange={(e) => {
              handleChange(e);
              setError('');
            }}
            value={formValues.Name}
            id='name'
          />
          {formErrors.name ? (
            <span className=' errors'>{formErrors.name}</span>
          ) : (
            ''
          )}
          <TextField
            margin='normal'
            fullWidth
            name='Email'
            label='Email'
            // type="Email"
            onChange={(e) => {
              handleChange(e);
              setError('');
            }}
            value={formValues.Email}
            id='Email'
          />
          {formErrors.email ? (
            <span className='errors'>{formErrors.email}</span>
          ) : (
            ''
          )}
          <TextField
            margin='normal'
            fullWidth
            name='Password'
            label='Password'
            type='password'
            onChange={(e) => {
              handleChange(e);
              setError('');
            }}
            value={formValues.Password}
            id='password'
          />
          {formErrors.password ? (
            <span className='errors '>{formErrors.password}</span>
          ) : (
            ''
          )}
          <TextField
            margin='normal'
            fullWidth
            name='Confirm_Password'
            label='Confirm password'
            type='password'
            onChange={(e) => {
              handleChange(e);
              setError('');
            }}
            value={formValues.Confirm_Password}
            id='c_password'
          />
          {formErrors.confirmPassword ? (
            <span className=' errors'>{formErrors.confirmPassword}</span>
          ) : (
            ''
          )}
          <div className='text-center'>
            <button className='btn login-btn'>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TeacherSignup;
