import React from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from "../assets/background.jpg";

function Home() {
  return (
    <div
      className="home-page text-white text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content d-flex justify-content-center align-items-center">
        <h1 className="fw-bold display-4">ONLINE INSURANCE PORTAL</h1>
      </div>

    
    </div>
  );
}

export default Home;