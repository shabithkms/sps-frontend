import "./App.css";
import { Routes, Route } from "react-router";
import AdminLogin from "./Pages/AdminLogin";
import TeacherLogin from "./Pages/TeacherLogin";
import TeacherSignup from "./Pages/TeacherSignup";
import AdminHome from "./Pages/AdminHome";
import TeacherList from "./Pages/TeacherList";
import TeacherHome from "./Pages/TeacherHome";
import TeacherProfile from "./Pages/TeacherProfile";
import EditTeacherProfile from "./Pages/EditTeacherProfile";
import Students from "./Pages/StudentManagement";
import Domains from "./Pages/DomainManagement";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/admin/teachers" element={<TeacherList />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>

        {/* Teacher routes */}
        {/* Teacher Auth */}
        <Route path="/teacher/login" element={<TeacherLogin />}></Route>
        <Route path="/teacher/:token" element={<TeacherSignup />}></Route>
        {/* Dashboard */}
        <Route path="/teacher" element={<TeacherHome />}></Route>
        {/* Profile Management */}
        <Route path="/teacher/profile/:id" element={<TeacherProfile />}></Route>
        <Route path="/teacher/editProfile/:id" element={<EditTeacherProfile />}></Route>
        <Route path="/teacher/editProfile/:id" element={<EditTeacherProfile />}></Route>

        {/* Student management */}
        <Route path="/teacher/students" element={<Students />}></Route>

        {/* Domain management */}
        <Route path="/teacher/domains" element={<Domains />}></Route>
      </Routes>
    </div>
  );
}

export default App;
