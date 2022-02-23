import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { update_student } from './Redux/studentSlice';
import Routes from './Routes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let student = JSON.parse(localStorage.getItem('student'));
    dispatch(update_student(student));
  });
  return (
    <div className='App'>
      {/* React hot toast */}
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: 'black',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
