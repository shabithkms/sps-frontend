import React from 'react';
import TeacherSideBar from '../../Components/Teacher/TeacherHome/TeacherSideBar';
import ReviewerTable from '../../Components/Teacher/ReviewerManagement/ReviewerTable';

function Reviewer() {
  return (
    <div className='d-flex'>
      <TeacherSideBar reviewer={true} />
      <div className='p-3'>
        <ReviewerTable />
      </div>
    </div>
  );
}

export default Reviewer;
