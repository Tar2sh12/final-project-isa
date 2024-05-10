import VaccineCenterHeader from "../../components/vaccineCenterHeader";
import { FiTrash, FiCheck } from "react-icons/fi";
import { BsPencil, BsDisplay } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, createContext, useState } from "react";
import axios from "axios";
import { getAuthToken, setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const VaccineCenterPage = () => {
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
      .get(
        "http://localhost:5003/api/VaccinaationCenter/ViewPatientsAssociatedWithVaccine",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
              <div
                key={index}
                className="col-sm-12 alert alert-danger"
                role="alert"
              >
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
      <VaccineCenterHeader />
      {users.err !== null && error()}
      {users.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Vaccination Centers</div>
                <div
                  className="card-body"
                  style={{ backgroundColor: "#F8F8F8" }}
                >
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <h5 className="card-title">
                        Patients Reservations List{" "}
                        <span className="text-muted fw-normal ms-2">
                          ({users.result.length})
                        </span>
                      </h5>
                    </div>
                  </div>
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
                              <th scope="col">Vaccine Name</th>
                              <th scope="col">Dose Number</th>
                              <th scope="col">approval actions</th>
                              <th scope="col">Certificate actions</th>
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
                                    <span className="badge badge-soft-primary mb-0">
                                      {user.vaccineName}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary mb-0">
                                      {user.doseNumber}
                                    </span>
                                  </td>
                                  <td>
                                    <li className="list-inline-item">
                                      <a
                                        // `http://localhost:5003/api/VaccinaationCenter/ApproveReservationById?id=${user.id}`
                                        onClick={() => {
                                          axios
                                            .put(
                                              `http://localhost:5003/api/VaccinaationCenter/ApproveReservationById?id=${user.id}`,
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
                                                err: [
                                                  {
                                                    msg: `something went wrong`,
                                                  },
                                                ],
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
                                        // `http://localhost:5003/api/VaccinaationCenter/RejectReservationById?id=${user.id}`
                                        onClick={() => {
                                          axios
                                            .put(
                                              `http://localhost:5003/api/VaccinaationCenter/RejectReservationById?id=${user.id}`,
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
                                                err: [
                                                  {
                                                    msg: `something went wrong`,
                                                  },
                                                ],
                                              });
                                            });
                                        }}
                                        className="px-2 text-primary"
                                      >
                                        <FiTrash style={{ color: "red" }} />
                                      </a>
                                    </li>
                                  </td>
                                  <td>
                                    <li className="list-inline-item">
                                      <a
                                        // `http://localhost:5003/api/VaccinaationCenter/ApproveReservationById?id=${user.id}`
                                        onClick={() => {
                                          axios
                                            .post(
                                              `http://localhost:5003/api/VaccinaationCenter/createCertificateForSpecficUserSecondDose?id=${user.id}`,
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
                                                err: [
                                                  {
                                                    msg: `something went wrong`,
                                                  },
                                                ],
                                              });
                                            });
                                        }}
                                        className="px-2 text-primary"
                                      >
                                        <FiCheck style={{ color: "blue" }} />
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VaccineCenterPage;
