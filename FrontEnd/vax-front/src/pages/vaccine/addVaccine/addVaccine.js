import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {  getAuthToken } from "../../../services/auth";
const AddVaccine = () => {
    const { token, user } = getAuthToken();
    const navigate=useNavigate();
    const [formm,setForm]=useState({
        name: "",
        description: "",
        //float
        price: "",
        //number
        quantityAvalible: "",
        preCautions: "",
        //number
        timeGapBetweenDoses: "",
        vaccinationCenterId: 0
    })

    const [users, setUsers] = useState({
        loading: false,
        result: [],
        err: null,
        update: false,
      });
      
    //   const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState(0);
      useEffect(() => {
        axios
          .get("http://localhost:5003/api/Admin/GetAllVaccinationCenters", {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  }
                )
          .then((resposne) => {
            setUsers({ ...users, result: resposne.data, loading: false, err: null });
          })
          .catch((errors) => {
            setUsers({ ...users, loading: false, err: [{ msg: `something went wrong` }] });
          });
      }, [ users.update]);
      

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
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(      setForm(prevState => ({
          ...prevState,
          vaccinationCenterId: selectedValue
        })));
  
        myFunction(selectedValue);
      };
    
      const myFunction = (selectedValue) => {
  
        console.log('Selected value:', selectedValue);
      };
  
    
       function handleSubmit(event) {
        event.preventDefault(); 
        // console.log({

        // });

        try {
            axios.post("http://localhost:5003/api/Admin/CreateVaccine",  {
                name: formm.name,
                description: formm.description,
                price: parseFloat(formm.price),
                quantityAvalible: parseInt(formm.quantityAvalible),
                preCautions: formm.preCautions,
                timeGapBetweenDoses: parseInt(formm.timeGapBetweenDoses),
                vaccinationCenterId: parseInt(formm.vaccinationCenterId)
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
              <div className="card-header">add vaccine</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="name">
                      Name 
                    </label>
                    <input className="form-control" onChange={handleChange} type="text" id="name" value={formm.name} name="name"  />
                    {/* <input  type="text" id="name" value={formm.name} onChange={handleChange}/> */}
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">

                    </div>
                    <label className="small mb-1" htmlFor="email">
                    Description
                    </label>
                    <input className="form-control" type="text" id="description" value={formm.description} onChange={handleChange} name="description"/>
                    <div className="col-md-6">

                      <label className="small mb-1" htmlFor="email">
                      Price
                    </label>
                    <input className="form-control" type="text" id="price" value={formm.price} onChange={handleChange} name="price"/>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                    Quantity Avalible
                    </label>
                    <input className="form-control" onChange={handleChange} type="text" id="quantityAvalible" value={formm.quantityAvalible} name="quantityAvalible" />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                    preCautions
                    </label>
                    <input className="form-control" onChange={handleChange} type="text" id="preCautions" value={formm.preCautions} name="preCautions" />
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                    Time Gap Between Doses
                    </label>
                    <input className="form-control" onChange={handleChange} type="text" id="timeGapBetweenDoses" value={formm.timeGapBetweenDoses} name="timeGapBetweenDoses" />
                  </div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="email">
                      Vaccination Centers
                    </label>
                    <select className="form-control" value={selectedOption} onChange={handleDropdownChange} type="text" id="role">
                        {
                            users.result.map((user) => {
                                return(<option value={parseInt(user.id)}>{user.name} </option>)
                                }
                            )
                        }
                    </select>                    </div>
                  <button  className="btn btn-primary" type="submit">
                    add
                  </button>
                </form>
                <button  onClick={()=>{
                    navigate('/vaccine')
                }}>back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};
export default AddVaccine