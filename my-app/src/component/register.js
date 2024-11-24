import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function register(e) {
    e.preventDefault(); 

    if (password !== repassword) {
      toast.error('Mật khẩu và re-mật khẩu phải giống nhau ')
      return;
    }

    if (!validateEmail(email)) {
        toast.error('Email không hợp lệ ')
      return;
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự ')
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:8080/register', { email, password ,name,phone});
      if (response) {
        console.log('Register success:', response.data);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", response.data.email);

        toast.success('Đăng ký thành công. Vui lòng đợi 3 giây để đăng nhập');

        setTimeout(() => {
          navigate("/login"); // Điều hướng đến trang đăng nhập sau 3 giây
        }, 3000);
      }
    } catch (err) {
      console.error('Register failed:', err.response ? err.response.data : err.message);
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={register}>
                    <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example1c">
                            Name
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="number"
                            id="form3Example1c"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example1c">
                            Phone Number
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example1c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example3c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example3c">
                            Your Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example4c">
                            Confirm Your Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                          {loading ? 'Đang đăng ký...' : 'Register'}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><Toaster />
      </div>
    </section>
  );
}

export default Register;
