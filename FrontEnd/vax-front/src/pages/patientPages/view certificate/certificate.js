import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/patientHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../../services/auth";
import "./certificate.css";
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
      .get(
        `http://localhost:5003/api/Patient/ViewCertificate?reservationId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Assuming `users` is a state variable
        setUsers({
          ...users,
          result: response.data,
          loading: false,
          err: null,
        });
        console.log(response.data); // Log the response data here
      })
      .catch((error) => {
        setUsers({
          ...users,
          loading: false,
          err: [{ msg: `Something went wrong` }],
        });
        console.error(error); // Log the error for debugging
      });
  }, [search, users.update]);
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
      <Header />
      {users.err !== null && error()}
      <div>
        <h1> </h1>
        <div className="new">
          <section id="card1" className="cardd">
            <svg
              viewBox="0 0 16 16"
              className="bi bi-image-fill"
              fill="currentColor"
              height="40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path> */}
            </svg>
            <div className="card__content">
              <p className="card__title">
                congratulation mr {users.result.patientName} for completing ur 2
                doses of vaccine : {users.result.vaccineName}
              </p>
              <p className="card__description">
                Related to vaccine center : {users.result.vaccinationCenterName}
              </p>
              <p className="card__description">
                Date : {users.result.certificateDate}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Certificate;
