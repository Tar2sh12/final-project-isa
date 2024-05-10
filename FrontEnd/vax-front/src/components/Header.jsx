import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../services/auth";
// import './Navbar.css'; 
import './header.css'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate();
  function checkTokens(){
      navigate("/login");
      removeAuthToken();
  }
  function homePage(){
    navigate("/admin-home");
  }
  function approvePage(){
    navigate("/approve-user");
  }
  function VaccinePage(){
    navigate("/vaccine");
  }
  function VaccinaationCenterPage(){
    navigate("/vaccine-center");
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#a2daf5' }}>
        <div className="container">
            <a className="navbar-brand" href="#">Vax Scheduler</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                <a onClick={homePage} className="nav-link" href="#">Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                <a onClick={approvePage} className="nav-link" href="#">Approve Patients<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                <a onClick={VaccinaationCenterPage} className="nav-link" href="#">Vaccinaation Center<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                <a onClick={VaccinePage} className="nav-link" href="#">vaccines<span className="sr-only">(current)</span></a>
                </li>
                <li>
                <button className="but" onClick={checkTokens}>
                        Sign up
                        <div class="arrow-wrapper">
                        <div class="arrow"></div>
                        </div>
                    </button>
                </li> 
            </ul>
            </div>
        </div>
        </nav>
    </div>
  );
};

export default Navbar;