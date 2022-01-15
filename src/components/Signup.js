import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";
const Signup = (props) => {
  const contest = useContext(ThemeContext)
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();
  const host = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    var x = document.getElementById("password").value;
    var y = document.getElementById("cpassword").value;
    const { name, email, password, cpassword } = credentials;
    if (x === y) {
      console.log(cpassword);
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json);

      //Save the auth token and redirect
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        history("/");
        props.showAlert("Account created successfully", "success", "SUCCESS");
      } else {
        props.showAlert("Invalid Details", "danger", "ERROR");
      }
    }

    
    else
    {
      props.showAlert("Password and Confirm Password does not match", "warning", "ERROR")
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className={`container mt-2 text-${
          contest.mode === "light" ? "dark" : "light"
        }`}>
      <h2 className="my-3">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter your name here..."
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email here..."
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password..."
            required
            minLength={5}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="password"
            aria-describedby="emailHelp"
            placeholder="Retype your password again"
            required
            minLength={5}
            onChange={onChange}
          />
        </div>
        <div id="emailHelp" className="form-text my-4">
          We'll never share your personal details with anyone else.
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Confirm Registration
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
