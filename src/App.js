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
import StudentSignup from "./Pages/Student/Signup";
import StudentsLogin from "./Pages/Student/Login";


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
        <Route path="/teacher/:token" element={<TeacherSignup />} />
        {/* Dashboard */}
        <Route path="/teacher" element={<TeacherHome />} />
        {/* Profile Management */}
        <Route path="/teacher/profile/:id" element={<TeacherProfile />} />
        <Route
          path="/teacher/editProfile/:id"
          element={<EditTeacherProfile />}
        ></Route>
        <Route
          path="/teacher/editProfile/:id"
          element={<EditTeacherProfile />}
        />

        {/* Student management */}
        <Route path="/teacher/students" element={<Students />}></Route>

        {/* Domain management */}
        <Route path="/teacher/domains" element={<Domains />}></Route>
        {/* Student routes */}
        <Route path="/signup" element={<StudentSignup />}></Route>
        <Route path="/login" element={<StudentsLogin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
