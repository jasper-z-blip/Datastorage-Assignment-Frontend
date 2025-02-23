import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/projects");
  };

  const handleEmployeeClick = () => {
    navigate("/no-access");
  };

  return (
    <div className="RoleContainer">
      <div className="button-container">
      <h1>Välj din roll</h1>
        <button className="AdminBtn" onClick={handleAdminClick}>Admin</button>
        <button className="EmployeeBtn" onClick={handleEmployeeClick}>Employee</button>
      </div>

      <div className="image-container">
        <img 
          src="/LogotypeML.jpg"
          alt="HML-Logotyp"
          style={{ maxWidth: "50%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default LandingPage;