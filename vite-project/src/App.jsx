import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Seat from "./Pages/Seat.jsx"
import Search from "./Pages/Search";
import Booking from "./Pages/Booking"
import Reciept from './Pages/Reciept.jsx';


import { FlightProvider } from "./context/Fliightcontext.jsx";




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
      }
      
    ]);
    

  return(
    <FlightProvider>
      <RouterProvider router={router} />
    </FlightProvider>
  );
}

export default App