import '../patientHome/patientHome.css'
import React,{useRef,useEffect,createContext,useState} from "react";
import axios, { formToJSON } from 'axios';
import {  getAuthToken, setAuthToken } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import PatientHeader from '../../../components/patientHeader'
import * as signalR from "@microsoft/signalr";
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const createSignalRConnection = () => {
  return  new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5003/RealTime")
      .withAutomaticReconnect()
      .build();
};

const PatientHome = () => {
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    const { token, user } = getAuthToken();
    const [users, setUsers] = useState({
     loading: false,
     result: [],
     err: null,
     update: false,
   });
//    function handeChange()
    const [search, setSearch] = useState("");
    let connection;
    connection = createSignalRConnection();

     
     
   useEffect(() => {
    const user= jwtDecode(localStorage.getItem("token"));
    const id=user.nameid
    console.log(id);
    if (connection) {
      connection.start()
          .then(result => {
            connection.on(id,(msg)=>{
              console.log(msg);
              toast.info(msg);
            })
          })
        }
     axios
       .get("http://localhost:5003/api/Patient/GetAllVaccinationCentersWithVaccines", {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
               }
             )
       .then((resposne) => {
         setUsers({ ...users, result: resposne.data, loading: false, err: null });
         resposne.data.forEach(element => {
            data.push({
                center:element.name,
                dose:"",
                vaccine:""
            })
         });
         console.log(resposne.data);
       })
       .catch((errors) => {
         setUsers({ ...users, loading: false, err: [{ msg: `something went wrong` }] });
       });
   }, [search, users.update]);
   
   const loadingSpinner = () => {
     return (
       <div className="container h-100">
         <div className="row h-100 justify-content-center align-items-center">
           <div className="spinner-border" role="status">
             <span className="sr-only">Loading...</span>
           </div>
         </div>
       </div>
     );
   };
   
  const error = () => {
     return (
       <div className="container">
         <div className="row">
           {users.err.map((err, index) => {
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
   

const [dose,setDose]=useState("");
const [vaccine,setVaccine]=useState("");
  return (
    <>
    <PatientHeader/>
    {users.err !== null && error()}
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div>
    <h1 className="heading">Welcome {getAuthToken().user.role} {getAuthToken().user.unique_name}</h1>
  </div>{
    users.result.map((user,index) => {

function handleDose(event){
    setDose(event.target.value);
{/*     
    console.log(dose); */}
}
function handleVaccine(event){
    setVaccine(event.target.value);
{/*     
    console.log(vaccine); */}
}
function handleSubmit(e){
    e.preventDefault();
    data[index].dose=dose;
    data[index].vaccine=vaccine;
    console.log(data);
    {/* http://localhost:5003/api/Patient/Reserve */}
    try {
            axios.post("http://localhost:5003/api/Patient/Reserve",  {
                doseNumber: parseInt(data[index].dose),
                vaccineName: data[index].vaccine,
                vaccinationCenterName: data[index].center
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log("fol el fol");
            })
            .catch((errors) => {
              setUsers({ ...users, loading: false, err: [{ msg: `something went wrong` }] });
            });
        } catch (error) {

          console.log('hello');
          console.error('POST request failed:', error);
        }
}
            if(user.vaccines.length!=0){
                return(
                    
                    <div className="container mt-4">
                    <div className="card shadow">
                        <div className="card-body">
                        <form onSubmit={handleSubmit}>

                        <h5 className="card-title" >{user.name}</h5>
                        <div className="form-group">
                            <label htmlFor="dropdown1">Doses</label>
                            <select className="form-control" id="dropdown1" value={dose} onChange={handleDose}>
                            <option ></option>
                            <option value="0">First Dose</option>
                            <option value="1">Second Dose</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dropdown2">Vaccines</label>
                            <select className="form-control"id="dropdown2" value={vaccine} onChange={handleVaccine} >
                            <option ></option>
                            {user.vaccines.map((e)=>{
                                return(<option value={e.name}>{e.name}</option>)
                            })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-custom">Reserve</button>
                        </form>
                        </div>
                        
                    </div>
                    </div>
                
                )
            }

    }
    )
}
    
</>

)
}

export default PatientHome
