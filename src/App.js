import "./App.css";
import { Routes, Route } from "react-router";
// Impoorting Admin Pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import Batches from "./Pages/Admin/BatchManagement";
import TeacherList from "./Pages/Admin/TeacherList";

// Importing Admin Pages
import TeacherLogin from "./Pages/Teacher/TeacherLogin";
import TeacherSignup from "./Pages/Teacher/TeacherSignup";
import TeacherHome from "./Pages/Teacher/TeacherHome";
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import EditTeacherProfile from "./Pages/Teacher/EditTeacherProfile";
import Students from "./Pages/Teacher/StudentManagement";
import Domains from "./Pages/Teacher/DomainManagement";

// Importing Student pages

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/admin/teachers" element={<TeacherList />}></Route>
        <Route path="/admin/batches" element={<Batches />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>

        {/* Teacher routes */}
        {/* Teacher Auth */}
        <Route path="/teacher/login" element={<TeacherLogin />}></Route>
        <Route path="/teacher/:token" element={<TeacherSignup />}></Route>
        {/* Dashboard */}
        <Route path="/teacher" element={<TeacherHome />}></Route>
        {/* Profile Management */}
        <Route path="/teacher/profile/:id" element={<TeacherProfile />}></Route>
        <Route
          path="/teacher/editProfile/:id"
          element={<EditTeacherProfile />}
        ></Route>
        <Route
          path="/teacher/editProfile/:id"
          element={<EditTeacherProfile />}
        ></Route>

        {/* Student management */}
        <Route path="/teacher/students" element={<Students />}></Route>

        {/* Domain management */}
        <Route path="/teacher/domains" element={<Domains />}></Route>
      </Routes>
    </div>
  );
}

export default App;
