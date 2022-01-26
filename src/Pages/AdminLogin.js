import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/AdminLogin/Login";

function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    let ADMIN = process.env.REACT_APP_ADMIN;
    let Admin = localStorage.getItem("Admin");
    console.log(Admin);
    if (Admin) {
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
    return () => {};
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default AdminLogin;
