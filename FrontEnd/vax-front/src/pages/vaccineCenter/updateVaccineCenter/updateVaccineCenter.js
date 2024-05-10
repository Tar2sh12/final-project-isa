
import React,{useState} from "react";
import { useParams } from "react-router-dom";
import './updateVaccineCenter.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {  getAuthToken } from "../../../services/auth";
 const UpdateVaccineCenter = () => {
    const { id } = useParams();
    const { token, user } = getAuthToken();
    const navigate=useNavigate();
    const [formm,setForm]=useState({
        name:"",
        email:"",
        phoneNumber:"",
        address:""
    })
    function handleChange(event){
        const{name, value}=event.target;
        setForm(prev=>{
            return{
                ...prev,
                [name]:value
                }
            }
        );
    }
       function handleSubmit(event) {
        event.preventDefault(); 
        console.log(formm)
        console.log(id);
        try {
            axios.put("http://localhost:5003/api/Admin/UpdateVaccinationCenter",  {
                id: id,
                name: formm.name,
                email: formm.email,
                phoneNumber: formm.phoneNumber,
                address: formm.address
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log("fol el fol");
            })
        } catch (error) {

          console.log('hello');
          console.error('POST request failed:', error);
        }
      }
   
  return (
    <>

       <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header">Update vaccine center Info</div>
              <div className="card-body">
                <form  onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="name">
                      Name 
                    </label>
                    <input className="form-control" onChange={handleChange} type="text" id="name" value={formm.name} name="name" />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="role">
                      address
                      </label>
                      <input className="form-control" type="text" id="address" value={formm.address} onChange={handleChange} name="address"/>
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="department">
                        phoneNumber
                      </label>

                      <input className="form-control"  type="text" id="phoneNumber" value={formm.phoneNumber} onChange={handleChange} name="phoneNumber"/>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                      Email
                    </label>
                    <input className="form-control" onChange={handleChange} type="email" id="email" value={formm.email} name="email" />
                  </div>
                  <button className="btn bsb-btn-xl btn-primary" style={{
                              backgroundColor: '#a2daf5',
                              borderColor: '#a2e6ee'
                            }} type="submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <button className="btn bsb-btn-xl btn-primary"  onClick={()=>{
        navigate('/vaccine-center')
      }}>back</button>
    </>
  );
};
export default UpdateVaccineCenter;