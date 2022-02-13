import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import StudentLogin from '../../Components/Auth/StudentLogin';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    let student = localStorage.getItem('student');
    if (student) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <StudentLogin />
    </div>
  );
}

export default Login;
