import './App.css';
import { Routes, Route } from 'react-router';
// Impoorting Admin Pages
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminHome from './Pages/Admin/AdminHome';
import Batches from './Pages/Admin/BatchManagement';
import TeacherList from './Pages/Admin/TeacherList';

// Importing Teacher Pages
import TeacherLogin from './Pages/Teacher/TeacherLogin';
import TeacherSignup from './Pages/Teacher/TeacherSignup';
import TeacherHome from './Pages/Teacher/TeacherHome';
import TeacherProfile from './Pages/Teacher/TeacherProfile';
import EditTeacherProfile from './Pages/Teacher/EditTeacherProfile';
import Students from './Pages/Teacher/StudentManagement';
import Domains from './Pages/Teacher/DomainManagement';
// Importing Reviewer pages
import Reviewer from './Pages/Teacher/ReviewerManagement';

// Importing Student pages
import StudentHome from './Pages/Student/Home';
import StudentSignup from './Pages/Student/Signup';
import StudentsLogin from './Pages/Student/Login';
import StudentProfile from './Pages/Student/Profile';
import StudentEditProfile from './Pages/Student/EditTeacherProfile';

// Importing Reviewer Pages
import ReviewerHome from '../src/Pages/Reviewer/Home';
import ReviewerLogin from '../src/Pages/Reviewer/Login';
import ReviewerSignup from '../src/Pages/Reviewer/Signup';

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHome />}></Route>
        <Route path='/admin/teachers' element={<TeacherList />}></Route>
        <Route path='/admin/batches' element={<Batches />}></Route>
        <Route path='/admin/login' element={<AdminLogin />}></Route>

        {/* Teacher routes */}
        {/* Teacher Auth */}
        <Route path='/teacher/login' element={<TeacherLogin />}></Route>
        <Route path='/teacher/:token' element={<TeacherSignup />} />
        {/* Dashboard */}
        <Route path='/teacher' element={<TeacherHome />} />
        {/* Profile Management */}
        <Route path='/teacher/profile/:id' element={<TeacherProfile />} />
        <Route path='/teacher/profile/' element={<TeacherLogin />} />
        <Route
          path='/teacher/editProfile/:id'
          element={<EditTeacherProfile />}
        ></Route>
        <Route
          path='/teacher/editProfile/:id'
          element={<EditTeacherProfile />}
        />
        {/* Reviewer Management */}
        <Route path='/teacher/reviewer' element={<Reviewer />} />

        {/* Student management */}
        <Route path='/teacher/students' element={<Students />}></Route>

        {/* Domain management */}
        <Route path='/teacher/domains' element={<Domains />}></Route>

        {/* Student routes */}
        <Route path='/' element={<StudentHome />}></Route>
        <Route path='/signup' element={<StudentSignup />}></Route>
        <Route path='/login' element={<StudentsLogin />}></Route>
        <Route path='/profile' element={<StudentProfile />}></Route>
        <Route path='/editProfile' element={<StudentEditProfile />}></Route>

        {/* Reviewer Routes */}
        <Route path='/reviewer' element={<ReviewerHome />} />
        <Route path='/reviewer/login' element={<ReviewerLogin />} />
        <Route path='/reviewer/register/:token' element={<ReviewerSignup />} />
      </Routes>
    </div>
  );
}

export default App;
