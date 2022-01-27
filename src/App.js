import './App.css';
import {Routes,Route} from 'react-router'
import AdminLogin from './Pages/AdminLogin'
import TeacherLogin from './Pages/TeacherLogin'
import AdminHome from './Pages/AdminHome'
import TeacherList from './Pages/TeacherList'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHome/>} props={{Dashboard:true}}></Route>
        <Route path='/admin/teachers' element={<TeacherList/>} props={{Teachers:true}}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>

        
        {/* Teacher routes */}
        <Route path='/teacher/login' element={<TeacherLogin/>} ></Route> 
      </Routes>
    </div>
  );
}

export default App;
