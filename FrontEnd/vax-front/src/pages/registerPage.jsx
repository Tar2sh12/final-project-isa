import React ,{useContext,useMemo, useState} from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import myImage from '../assets/1000.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const navigate =useNavigate();
    const [err,setError]=useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      userRoleId: 0
    });
    const [selectedOption, setSelectedOption] = useState(0);

    const handleDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(      setFormData(prevState => ({
        ...prevState,
        userRoleId: selectedValue
      })));

      myFunction(selectedValue);
    };
  
    const myFunction = (selectedValue) => {

      console.log('Selected value:', selectedValue);
    };





    






    const handleChange = (e) => {
      const { name, value, type } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]:  value
      }));

    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(typeof (Number(formData.userRoleId)));
      console.log(formData);
        axios.post("http://localhost:5003/api/Account/register", {
            name: formData.name,
            email:formData.email ,
            password:formData.password ,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            userRoleId: Number(formData.userRoleId)
        }).then().catch((errors) => {
          setError([{ msg: `email or pass are already used` }]);
        });
      console.log(formData);
      console.log(Number(formData.userRoleId));
    };
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
    <div>
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
                src={myImage}
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <h2 className="h3">Registration</h2>
                      <h3 className="fs-6 fw-normal text-secondary m-0">
                        Enter your details to register
                      </h3>
                    </div>
                  </div>
                </div>
                <form action="#!" onSubmit={handleSubmit}>
                  <div className="row gy-3 gy-md-4 overflow-hidden">
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="text" id="address" name="address" value={formData.address} onChange={handleChange} required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
                      <input
                        className="form-control"
                        type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="type" className="form-label">Type <span className="text-danger">*</span></label>
                      <select className="form-select" name="type" id="type" required value={selectedOption} onChange={handleDropdownChange} >
                        <option value="" disabled selected>Select Type</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Patient</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn bsb-btn-xl btn-primary" type="submit" style={{ backgroundColor: '#a2daf5', borderColor: '#a2daf5' }}>
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <p className="mt-3 text-secondary text-center">
                      Do you have an account?
                      <Link onClick={()=>{navigate("/login")}}><a
                        href="#!"
                        className="link-primary text-decoration-none"
                        style={{ color: '#a2daf5 !important' }}
                      >
                        Sign in
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
    </div>
  )
}

export default RegisterPage;
