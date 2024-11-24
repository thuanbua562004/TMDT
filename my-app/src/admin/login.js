import React, { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const loginAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/adminLogin', { password });
  
      console.log(response.status);
  
      if (response.status === 200) {
        localStorage.setItem('adminToken', response.data.id);
        window.location.href = '/admin';
      } else if (response.status === 401) {
        console.log('Unauthorized: Incorrect password');
      } else {
        console.log('Error: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
  

  return (
<div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="row w-100">
    <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
      <div className="card shadow-lg">
        <div className="card-header text-center bg-primary text-white">
          <h4 className="mb-0">Đăng Nhập Admin</h4>
        </div>
        <div className="card-body">
            {/* Username Input */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Tên người dùng</label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Nhập tên người dùng"
                required
                value={'admin'}
               
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <div className=" gap-3">
              <button  onClick={loginAdmin} className="btn btn-primary w-100">
                Đăng Nhập
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
