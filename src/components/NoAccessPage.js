import React from "react";
import { useNavigate } from "react-router-dom";

const NoAccessPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Ej tillräcklig behörighet, kontakta din chef för att få tillgång.</h1>
      <button className="btn-back" onClick={handleBackClick}>Tillbaka</button>
    </div>
  );
};

export default NoAccessPage;