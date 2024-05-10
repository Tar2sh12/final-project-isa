import React from 'react'
import './patientHeader.css'
import { Link } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../services/auth";
import './header.css'
import { useNavigate } from 'react-router-dom';
const VaccineCenterHeader = () => {
    const navigate=useNavigate();
    function checkTokens(){
        navigate("/login");
        removeAuthToken();
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
  )
}

export default VaccineCenterHeader



