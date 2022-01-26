import './App.css';
import {Routes,Route} from 'react-router'
import Login from './Pages/AdminLogin'
import AdminHome from './Pages/AdminHome'
import TeacherList from './Pages/TeacherList'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHome/>} props={{Dashboard:true}}></Route>
        <Route path='/admin/teachers' element={<TeacherList/>} props={{Teachers:true}}></Route>
        <Route path='/admin/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
