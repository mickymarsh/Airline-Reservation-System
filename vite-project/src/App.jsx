import React from 'react';

import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Seat from "./Pages/Seat.jsx"
import Search from "./Pages/Search";
import Booking from "./Pages/Booking"
import Reciept from './Pages/Reciept.jsx';
import History from './Pages/History.jsx';

//CHATHU
import AdminHome from './client/pages/adminHome/adminHome.jsx'
//import AdminHome from '../../client/src/pages/adminHome/adminHome.jsx';
import AddAircraftPage from './client/pages/addAircraft/addAircraft.jsx';
import AddRoutesPage from './client/pages/addRoutes/addRoutes.jsx';
import AddFlightPage from './client/pages/addFlight/addFlight.jsx';
import AdminSignUp from './client/pages/adminSignUp/adminSignUp.jsx';
import StatisticsPage from './client/pages/viewStatistics/statistics.jsx';
import UpdateAircraftPage from './client/pages/updateAircraftServiceDate/updateServiceDate.jsx';
import AdminLogin from './client/pages/adminLogin/adminLogin.jsx';

import { FlightProvider } from "./context/Fliightcontext.jsx";
import { AuthContextProvider } from './context/Authcontext.jsx';




function App(){


  

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/error",
        element: <Error/>,
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/seat",
        element: <Seat/>,
      },
      {
        path: "/booking",
        element: <Booking/>,
      },
      {
        path: "/receipt",
        element: <Reciept/>,
      },
      {
        path: "/history",
        element: <History/>,
      },
      {path : "/adminHome", element: <AdminLogin />},
      {path : "/adminHome/:email", element: <AdminHome />},
      {path : "/adminHome/:email/addRoute", element: <AddRoutesPage />},
      {path : "/adminHome/:email/addAircraft", element: <AddAircraftPage />},
      {path : "/adminHome/:email/updateAircraftServiceDate", element: <UpdateAircraftPage />},
      {path : "/adminHome/:email/statistics", element: <StatisticsPage/>},
      {path : "/adminHome/:email/addFlight", element: <AddFlightPage/>},
      {path : "/adminSignUp", element: <AdminSignUp />},
      {path : "/adminLogin", element: <AdminLogin />}
      
    ]);
    

  return(
    <AuthContextProvider>
      <FlightProvider>
        <RouterProvider router={router} />
      </FlightProvider>
    </AuthContextProvider>
  );
}

export default App