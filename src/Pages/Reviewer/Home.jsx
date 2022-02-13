import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Dashboard from '../../Components/Reviewer/Dashboard';
import Sidebar from '../../Components/Reviewer/SideBar';

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    let reviewer = JSON.parse(localStorage.getItem('reviewer'));
    console.log(reviewer);
    if (reviewer) {
      navigate('/reviewer');
    } else {
      navigate('/reviewer/login');
    }
  }, []);
  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='p-3'>
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
