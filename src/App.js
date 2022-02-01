import "./App.css";
import { Routes, Route } from "react-router";
import AdminLogin from "./Pages/AdminLogin";
import TeacherLogin from "./Pages/TeacherLogin";
import TeacherSignup from "./Pages/TeacherSignup";
import AdminHome from "./Pages/AdminHome";
import TeacherList from "./Pages/TeacherList";
import TeacherHome from "./Pages/TeacherHome";
import TeacherProfile from "./Pages/TeacherProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route path="/admin/teachers" element={<TeacherList />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>

        {/* Teacher routes */}
        <Route path="/teacher" element={<TeacherHome />}></Route>
        <Route path="/teacher/login" element={<TeacherLogin />}></Route>
        <Route path="/teacher/:token" element={<TeacherSignup />}></Route>
        <Route path="/teacher/profile/:id" element={<TeacherProfile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
