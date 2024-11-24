import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Logg.png';

function Header() {
  const token = localStorage.getItem('email');
  const navigate = useNavigate();

  // Xử lý đăng xuất
  const handleLogout = () => {
      localStorage.clear();
      navigate('/login'); // Chuyển hướng về trang đăng nhập
  };

  return (
    <header className="sticky-top">
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-white" id="header-nav">
          <div className="container">
            <div className="d-flex align-items-center">
              <Link to="/" className="navbar-brand">
                <img className="header-logo" src={logo} alt="header Logo Honda" />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav ml-auto d-flex align-items-center p-2">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">Trang Chủ</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/product">Sản Phẩm</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/cart">Giỏ hàng</Link>
                </li>

                {/* Hiển thị nút Đăng nhập hoặc Đăng xuất dựa trên token */}
                {token ? (
                  <li className="nav-item dropdown">
                    <button
                      className="btn btn-danger dropdown-toggle"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-circle"></i> {token}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate("/history")}
                        >
                          Thông tin mua hàng
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </li>

                ) : (
                  <li className="nav-item">
                    <Link className="btn btn-danger" to="/login">
                      Đăng nhập
                    </Link>
                  </li>
                )}

                <li className="d-flex justify-content-between">
                  <a href="https://www.facebook.com/">
                    <i className="icon-red bi-header bi-facebook text-danger"></i>
                  </a>
                  <a href="https://www.instagram.com/">
                    <i className="icon-red bi-header bi-instagram text-danger"></i>
                  </a>
                  <a href="https://twitter.com/">
                    <i className="icon-red bi-header bi-twitter text-danger"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
