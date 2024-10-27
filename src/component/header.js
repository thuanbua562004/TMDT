import React from 'react';

function Header() {
  return (
    <header className="sticky-top">
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-light bg-white" id="header-nav">
          <div className="container">
            <div className="d-flex align-items-center">
              <a href="/index.html" className="navbar-brand">
                <img className="header-logo" src="./images/Logg.png" alt="header Logo Honda" />
              </a>
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
                  <a className="nav-link text-dark" href="/index.html">Trang chủ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#motorcycles">Xe máy</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#service">Dịch vụ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="./contacto/contacto.html">Liên hệ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/about-us.html">Chúng tôi</a>
                </li>
                <li className="nav-item">
                  <button
                    className="button-gen btn btn-danger"
                    type="button"
                    data-toggle="modal"
                    data-target="#modal-sub"
                  >
                    Đặt mua
                  </button>
                </li>
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
