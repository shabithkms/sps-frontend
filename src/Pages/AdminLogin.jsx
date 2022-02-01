import { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/Auth/AdminLogin";

function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    let ADMIN = process.env.REACT_APP_ADMIN;
    let Admin = localStorage.getItem("Admin");
    if (Admin) {
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
    return () => {};
  }, []);

  return (
    <div>
      <Login Admin={true}/>
    </div>
  );
}

export default AdminLogin;
