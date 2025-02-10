import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import { AuthContext } from "./context/Authcontext.jsx"; 
import { useContext } from "react";




function App(){

  const { currentUser } = useContext(AuthContext);

  const Protectedlayout = ({children}) =>
    {
      if(!currentUser){
        return(<Navigate to="/error"></Navigate>);
      }
      else{
        return children;
      }
    }

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
        path: "/dashboard",
        element: (
          <Protectedlayout>
            <Dashboard />
          </Protectedlayout>
        ),
      },
    ]);
    

  return(
    <RouterProvider router={router} />
  );
}

export default App