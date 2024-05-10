import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import './bootstrapLogin.css'
import React,{useRef,useEffect,createContext,useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  getAuthToken, setAuthToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import LoginImage from '../assets/1000.jpg'
export const Mo=createContext("moo");

const Login = () => {
  const [err,setError]=useState(null);
  const navigate = useNavigate();
  const r=useRef(null)
  useEffect(()=>{
      r.current.focus();
  },[]);
  
  const [details,setDetails]= useState({
      email:"",
      password:""
  })
  function handleChange(event){
      const{name, value}=event.target;
      setDetails(prev=>{
          return{
              ...prev,
              [name]:value
              }
          }
      );
  }
    async function handleSubmit(event) {
      event.preventDefault(); 
      try {
          console.log(details);
          axios.post("http://localhost:5003/api/Account/login", {
          email:details.email,
          password:details.password
            
          }).then((res) => {
            setAuthToken(res.data);
            if (res.data.role === "admin") {
              navigate("/admin-home");
            } else if (res.data.role === "patient") {
              navigate("/patient-home");
            }
            else{
              navigate("/vaccination-center-home");
            }
          }).catch((errors) => {
            setError([{ msg: `email or pass are wrong` }]);
          });
      } catch (error) {     
        console.log('hello');
        console.error('POST request failed:', error);
      }
    }
    const error = () => {
      return (
        <div className="container">
          <div className="row">
            {err.map((err, index) => {
              return (
                <div key={index} className="col-sm-12 alert alert-danger" role="alert">
                  {err.msg}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

return (
  <>
  {/* <Header/> */}
  {err !== null && error()}
  <section className="p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="card border-light-subtle shadow-sm">
          <div className="row g-0">
            <div className="col-12 col-md-6">
              <img
                className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                loading="lazy"
                src={LoginImage}
                alt="BootstrapBrain Logo"
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h2 className="h3">Login</h2>
                      <h3 className="fs-6 fw-normal text-secondary m-0">
                        Enter your credentials to login
                      </h3>
                    </div>
                  </div>
                </div>
                <form action="#!" onSubmit={handleSubmit}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" ref={r} onChange={handleChange} type="email" id="email" value={details.email} name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" onChange={handleChange} type="password" id="password" value={details.password}  name="password" placeholder="Enter your password" required/>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                          style={{
                            backgroundColor: '#a2daf5',
                            borderColor: '#a2e6ee'
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <p className="mt-3 text-secondary text-center">
                      Don't have an account?
                      <Link onClick={()=>{navigate("/register")}}><a
                        href="#!"
                        className="link-primary text-decoration-none"
                        style={{ color: '#a2daf5 !important' }}
                      >
                        Sign up
                      </a></Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default Login;
