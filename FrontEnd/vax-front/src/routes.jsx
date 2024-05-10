import {  createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import Home from "./pages/Home";
import Login from "./pages/loginPage";
import RegisterPage from './pages/registerPage';
import { AuthGuard } from "./guards/auth-guard";
import Error from "./components/error";
import Vaccine from "./pages/vaccine/vaccine.js";
import VaccineCenter from "./pages/vaccineCenter/vaccineCenter";
import Approval from "./pages/approveUser/approval.js";
import AddVaccineCenter from './pages/vaccineCenter/addVaccineCenter/addVaccineCenter.js'
import UpdateVaccineCenter from "./pages/vaccineCenter/updateVaccineCenter/updateVaccineCenter.js";
import AddVaccine from "./pages/vaccine/addVaccine/addVaccine.js";
import UpdateVaccine from "./pages/vaccine/updateVaccine/updateVaccine.js";
import PatientHome from './pages/patientPages/patientHome/patientHome.js';
import PatientReserve from './pages/patientPages/patientReserve/patientReserve.js'
import VaccineCenterPage from "./pages/vaccineCenterPage/vaccineCenter.js";
import Certificate from "./pages/patientPages/view certificate/certificate.js";
export const routes = createBrowserRouter([
  {
    path: "", //localhost:3000
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        // Guard
        element: <AuthGuard roles={[]} />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
      

      //Guard for admins
      {
        element: <AuthGuard roles={["Admin"]} />,
        children: [
          {
            path: "/admin-home", 
            element: <Home />,
          },
          {
            path: "/vaccine", 
            element: <Vaccine />,
          },
          {
            path: "/vaccine-center",
            element: <VaccineCenter />,
          },
          {
            path: "/approve-user", 
            element: <Approval />,
          },
          {
            path: "/addVaccineCenter", 
            element: <AddVaccineCenter />,
          },
          {
            path:'/updateVaccineCenter/:id',
            element: <UpdateVaccineCenter/>
          }
          ,
          {
            path:'/addVaccine',
            element: <AddVaccine/>
          }
          ,
          {
            path:'/updateVaccine/:id',
            element: <UpdateVaccine/>
          },
          {
            path:'/vaccine',
            element: <Vaccine/>
          }
        ],
      },
      {
        element: <AuthGuard roles={["Patient"]} />,
        children: [
          {
            path:'/patient-home',
            element: <PatientHome/>
          },
          {
            path:'/patientReserve',
            element: <PatientReserve/>
          },
          {
            path:'/viewCertificate/:id',
            element: <Certificate/>
          }
        ]
      },
      {
        element: <AuthGuard roles={["Vaccination Center"]} />,
        children: [
          {
            path:'/vaccination-center-home',
            element: <VaccineCenterPage/>
          }
        ]
      },


    //   {
    //     element: <AuthGuard roles={["Admin"]} />,
    //     children: [
    //       {
    //         path: "/admin-home", // home page
    //         element: <AdminHome />,
    //       },
    //       {
    //         path: "/show-user/:id",
    //         element: <ShowUser />,
    //       },
    //       {
    //         path: "/update-user",
    //         element: <UpdateUser />,
    //       },
    //     ],
    //   },

      // Guard for professor
    //   {
    //     element: <AuthGuard roles={["Professor"]} />,
    //     children: [
    //       {
    //         path: "/professor-home",
    //         element: <ProfessorHome />,
    //       },
    //     ],
    //   },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
