import React,{useEffect} from "react";
import { useNavigate } from "react-router";
import StudentSignup from "../../Components/Auth/StudentSignup";

function Signup() {
  const navigate = useNavigate()
  useEffect(() => {
    let student = localStorage.getItem("student");
    if (student) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <StudentSignup />
    </div>
  );
}

export default Signup;
