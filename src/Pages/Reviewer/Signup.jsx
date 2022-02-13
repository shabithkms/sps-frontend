import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ReviewerSignup from '../../Components/Auth/ReviewerSignup';

function Signup() {
  let navigate = useNavigate();
  useEffect(() => {
    let reviewer = JSON.parse(localStorage.getItem('reviewer'));
    console.log(reviewer);
    if (reviewer) {
      navigate('/reviewer');
    }
  }, []);
  return (
    <div>
      <ReviewerSignup />
    </div>
  );
}

export default Signup;
