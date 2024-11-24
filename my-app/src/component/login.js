import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handlerLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn form reload trang

    try {
      const response = await axios.post('http://localhost:8080/user', { email, password });
      if (response) {
        console.log('Login success:', response.data);
        localStorage.setItem("id" , response.data.id)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("name" , response.data.name)
        localStorage.setItem("phone",response.data.phone)
        toast.success('Login successful!');
        navigate("/")
      }
    } catch (err) {
      toast.error('Thất Bại')
      console.error('Login failed:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-lg-5 col-md-8 col-sm-10 shadow p-5 rounded bg-white">
        <form onSubmit={handlerLogin}>
          <h3 className="text-center mb-4">Sign In</h3>

          {/* Email input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary btn-block w-100 mb-4"
          >
            Sign in
          </button>

          {/* Register buttons */}
          <div className="text-center">
            <p>
              Not a member? <a href="/register" className="text-decoration-none">Register</a>
            </p>

            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter" />
              </button>
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github" />
              </button>
            </div>
          </div>
        </form>
      </div><Toaster/>
    </div>
  );
}

export default Login;
