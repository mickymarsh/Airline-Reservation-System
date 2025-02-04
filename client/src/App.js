import React from 'react';
import AdminHomePage from './pages/adminHome/adminHome.jsx';
import AdminSignUp from './pages/adminSignUp/adminSignUp.jsx';
import AdminLogin from './pages/adminLogin/adminLogin.jsx';
//import AdminHomePage from './pages/adminHome/adminHome.jsx';




import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/adminHome/:email" element={<AdminHomePage />} />
                <Route path="/adminSignUp" element={<AdminSignUp />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
            </Routes>
        </Router>
         
    )
};

export default App;