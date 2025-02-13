import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Routes() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });

  const handlechange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Inputs before sending:", inputs);

    try {
      const response = await axios.post("http://localhost:8800/api/Register", inputs);
      console.log(response.data);
      console.log("Data sent successfully");
      navigate("/Login");
    } catch (err) {
      console.log("Error:", err.response?.data || err);
      setErr(err.response?.data || "An error occurred");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <input type="text" placeholder="First name" name="first_name" onChange={handlechange} />
          <input type="text" placeholder="Last name" name="last_name" onChange={handlechange} />
        </div>
        <input type="text" placeholder="Full name" name="full_name" onChange={handlechange} />
        <select name="gender" onChange={handlechange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" placeholder="Date of birth" name="dob" onChange={handlechange} />
        <input type="text" placeholder="Passport number" name="passport_number" onChange={handlechange} />
        <input type="text" placeholder="Mobile number" name="mobile_num" onChange={handlechange} />
        <input type="email" placeholder="Email address" name="email" onChange={handlechange} />
        <input type="password" placeholder="Password" name="password" onChange={handlechange} />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit" onClick={handleClick}>Register</button>
      </form>
    </div>
  );
}

export default Routes;
