import Header from "../../components/Header";
import { FiTrash, FiCheck } from "react-icons/fi";
import { BsPencil, BsDisplay } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, createContext, useState } from "react";
import axios from "axios";
import { getAuthToken, setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const Approval = () => {
  const navigate = useNavigate();
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
      .get("http://localhost:5003/api/Admin/GetAllPatients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resposne) => {
        setUsers({
          ...users,
          result: resposne.data,
          loading: false,
          err: null,
        });
      })
      .catch((errors) => {
        setUsers({
          ...users,
          loading: false,
          err: [{ msg: `something went wrong` }],
        });
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
    <div>
      <Header />
      {users.err !== null && error()}
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table project-list-table table-nowrap align-middle table-borderless">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {users.result.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {user.name} {user.id}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge badge-soft-success mb-0">
                          {user.address}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-soft-primary mb-0">
                          {user.phoneNumber}
                        </span>
                      </td>
                      <td>
                        <li className="list-inline-item">
                          <a
                            // `http://localhost:5003/api/Admin/ApproveUserById?id=${user.id}`
                            onClick={() => {
                              axios
                                .put(
                                  `http://localhost:5003/api/Admin/ApproveUserById?id=${user.id}`,
                                  {},
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((resposne) => {
                                  console.log("mya mya yryasa");
                                  setUsers({
                                    ...users,
                                    loading: false,
                                    err: null,
                                    update: !users.update,
                                  });
                                })
                                .catch((errors) => {
                                  console.log(token);
                                  setUsers({
                                    ...users,
                                    loading: false,
                                    err: [{ msg: `something went wrong` }],
                                  });
                                });
                            }}
                            className="px-2 text-primary"
                          >
                            <FiCheck style={{ color: "blue" }} />
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a
                            // http://localhost:5003/api/Admin/RejectUserById?id=23
                            onClick={() => {
                              axios
                                .put(
                                  `http://localhost:5003/api/Admin/RejectUserById?id=${user.id}`,
                                  {},
                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((resposne) => {
                                  console.log("mya mya yryasa");
                                  setUsers({
                                    ...users,
                                    loading: false,
                                    err: null,
                                    update: !users.update,
                                  });
                                })
                                .catch((errors) => {
                                  console.log(token);
                                  setUsers({
                                    ...users,
                                    loading: false,
                                    err: [{ msg: `something went wrong` }],
                                  });
                                });
                            }}
                            className="px-2 text-primary"
                          >
                            <FiTrash style={{ color: "red" }} />
                          </a>
                        </li>
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
  );
};

export default Approval;
