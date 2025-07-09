import "./forgotPassword.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    return (
        <div className="forgotPassword-container">
            <p>Not Registered yet?</p>
            <Link to="../../pages/adminSignUp/adminSignUp.jsx">Register Now
            </Link>
        </div>
    )
}

//only added the signUp if not registered functionality even though it is called forgotPassword