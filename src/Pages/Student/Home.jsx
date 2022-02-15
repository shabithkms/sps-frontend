import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../../Components/Student/Footer/Footer";
import Header from "../../Components/Student/Header/Header";

function Home() {
  const navigate = useNavigate();
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
      <Header />
      <h1>Homepage</h1>
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
