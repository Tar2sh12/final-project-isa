import { FiTrash } from "react-icons/fi";
import { BsPencil, BsDisplay } from "react-icons/bs";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import React,{useRef,useEffect,createContext,useState} from "react";
import axios from 'axios';
import {  getAuthToken, setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Vaccine = () => {

const navigate=useNavigate();
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
    .get("http://localhost:5003/api/Admin/getAllVaccines", {
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

return (
  <>
  <Header/>
    {users.err !== null && error()}
    {users.loading === true ? (
      loadingSpinner()
    ) : (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-xl-12">
            <div className="card mb-4">
              <div className="card-header">Vaccines</div>
              <div className="card-body" style={{ backgroundColor: "#F8F8F8" }}>
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h5 className="card-title">
                    Vaccines List <span className="text-muted fw-normal ms-2">({users.result.length})</span>
                    </h5>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                      <div>
                        <a className="btn bsb-btn-xl btn-primary" onClick={()=>{navigate('/addVaccine')}} >Add New</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table project-list-table table-nowrap align-middle table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">description</th>
                            <th scope="col">price</th>
                            <th scope="col">quantityAvalible</th>
                            <th scope="col">preCautions</th>
                            <th scope="col">timeGapBetweenDoses</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.result.map((user) => {
                            return (
                              <tr key={user.name}>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>
                                  <span className="badge badge-soft-primary mb-0">{user.price}</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary mb-0">{user.quantityAvalible}</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary mb-0">{user.preCautions}</span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary mb-0">{user.timeGapBetweenDoses}</span>
                                </td>
                                <td>
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                      {/* <a className="px-2 text-primary" onClick={()=>{navigate('/updateVaccineCenter/${user.id}')}}> */}
                                      {/* <Link  > */}
                                      <Link to={`/updateVaccine/${user.id}`} >
                                        <BsPencil style={{ color: "blue" }}  />
                                        </Link>
                                        {/* </Link> */}
                                      {/* </a> */}
                                    </li>
                                    <li className="list-inline-item">
                                      <a
                                        onClick={() => {
                                          axios
                                          
                                            .delete(`http://localhost:5003/api/Admin/DeleteVaccine?id=${user.id}`, {
                                              headers: {
                                                Authorization: `Bearer ${token}`,
                                              },
                                            })
                                            .then((resposne) => {
                                              console.log('mya mya yryasa')
                                              setUsers({ ...users, loading: false, err: null, update: !users.update });
                                            })
                                            .catch((errors) => {
                                              setUsers({ ...users, loading: false, err: [{ msg: `something went wrong` }] });
                                            });
                                        }}
                                        className="px-2 text-primary"
                                      >
                                        <FiTrash style={{ color: "red" }}  />
                                      </a>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

  </>
);
}

export default Vaccine