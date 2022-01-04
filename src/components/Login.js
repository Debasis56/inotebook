import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credentials, setcredentials] = useState({email: "", password: ""})
    let history = useNavigate();
    const host = "http://localhost:5000"
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
           
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success)
          {
              //Save the auth token and redirect
              localStorage.setItem('token', json.authToken);
              props.showAlert("Logged in Successfully", "success", "SUCCESS")
              history("/");
              
          }
          else
          {
            props.showAlert("Invalid Credentials", "danger", "ERROR")
         
          }
        }
          const onChange = (e) => {
            setcredentials({...credentials, [e.target.name]: e.target.value})
        
        }
    
    
    return (
        <div className="mt-3">
          <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
    <label className="form-check-label" htmlFor="exampleCheck1">Confirm Login</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login
