import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from '../../../components/patientHeader'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {  getAuthToken } from "../../../services/auth";
const Certificate = () => {
    const { id } = useParams();
    const { token, user } = getAuthToken();
    const [users, setUsers] = useState({
        loading: false,
        result: [],
        err: null,
        update: false,
      });
      
      const [search, setSearch] = useState("");
      
      useEffect(() => {
        axios
  .get(`http://localhost:5003/api/Patient/ViewCertificate?reservationId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Assuming `users` is a state variable
    setUsers({ ...users, result: response.data, loading: false, err: null });
    console.log(response.data); // Log the response data here
  })
  .catch((error) => {
    setUsers({ ...users, loading: false, err: [{ msg: `Something went wrong` }] });
    console.error(error); // Log the error for debugging
  });
      }, [search, users.update]);
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
      
  return (
    <>
    <Header/>
    {users.err !== null && error()}
        <div>
        <h1>hello </h1>
        </div>
    </>
  )
}

export default Certificate
