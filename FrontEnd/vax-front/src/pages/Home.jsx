import React,{useContext} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mo } from "./loginPage";
import { getAuthToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import vaccineImage from '../assets/Covid-19-vaccines-8-750x500.jpg'
import vaccineCenterImage from '../assets/Types-of-Hospitals-2.jpg'
import userImage from '../assets/types-of-users-vector.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin-hom.css'
function Home() {
const e=useContext(Mo);
const navigate=useNavigate();
  
console.log(getAuthToken().user);
return (
        <div>
            <Header/>
            {/* <h1 color="black"> Hello {getAuthToken().user.role} {getAuthToken().user.unique_name}</h1> */}
            <section className="wrapper">
      <div className="container-fostrap">
        <div>
          <h1 className="heading">Welcome {getAuthToken().user.role} {getAuthToken().user.unique_name}</h1>
        </div>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <div className="card">
                  <a className="img-card" href="">
                    <img
                      src={userImage}
                      alt="Users"
                    />
                  </a>
                  <div className="card-content">
                    <h4 className="card-title">
                      <a href="">Users</a>
                    </h4>
                    <p className="">Users description</p>
                  </div>
                  <div className="card-read-more">
                    <a href=""  onClick={()=>{navigate("/approve-user")}} className="btn btn-link btn-block">Enter</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4">
                <div className="card">
                  <a className="img-card" href="">
                    <img src={vaccineCenterImage}  alt="Vaccination Centers" />
                  </a>
                  <div className="card-content">
                    <h4 className="card-title">
                      <a href="">Vaccination Centers</a>
                    </h4>
                    <p className="">Vaccination Centers description</p>
                  </div>
                  <div className="card-read-more">
                    <a href="" onClick={()=>{navigate("/vaccine-center")}} className="btn btn-link btn-block">Enter</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4">
                <div className="card">
                  <a className="img-card" href="">
                    <img src={vaccineImage}  alt="Vaccines" />
                  </a>
                  <div className="card-content">
                    <h4 className="card-title">
                      <a href="">Vaccines</a>
                    </h4>
                    <p className="">Vaccines description</p>
                  </div>
                  <div className="card-read-more">
                    <a href="" onClick={()=>{navigate("/vaccine")}} className="btn btn-link btn-block">Enter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            {/* <button  className="btn bsb-btn-xl btn-primary" onClick={()=>{navigate("/vaccine-center")}}>vaccine-center</button>
            <button  className="btn bsb-btn-xl btn-primary" onClick={()=>{navigate("/vaccine")}}>vaccine</button>
            <button  className="btn bsb-btn-xl btn-primary" onClick={()=>{navigate("/approve-user")}}>approve-user</button> */}
            {/* <Footer/> */}
  
        </div>
    );
}

export default Home;
