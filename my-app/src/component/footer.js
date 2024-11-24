import React from 'react';

function Footer() {
  return (
    <footer className="page-footer font-small indigo mt-5">
      <div className="container-fluid">

        <div className="row text-center text-white d-flex justify-content-center pt-5 mb-3">

          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="text-white text-decoration-none" href="/index.html">Bắt đầu</a>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="text-white text-decoration-none" href="#motorcycles">Xe máy</a>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="text-white text-decoration-none" href="/contacto/contacto.html">Liên hệ</a>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="text-white text-decoration-none" href="/about-us.html">Chúng tôi</a>
            </h6>
          </div>
          <div className="col-md-2 mb-3">
            <h6 className="text-uppercase font-weight-bold">
              <a className="text-white text-decoration-none" data-toggle="modal" data-target="#modal-sub">Đặt mua</a>
            </h6>
          </div>

        </div>
        <div className="row d-flex text-center text-white justify-content-center mb-md-0 mb-4">
          <div className="col-md-8 col-12 mt-5">
            <p>
            Sức mạnh của những giấc mơ là khẩu hiệu toàn cầu của Honda và có lẽ được biết đến nhiều nhất trên thế giới. Lấy cảm hứng từ suy nghĩ của người sáng lập Công ty, Soichiro Honda, kỹ sư và nhà nghiên cứu không mệt mỏi, nó đại diện cho triết lý đã dẫn dắt thương hiệu kể từ khi thành lập: tin tưởng và theo đuổi những tầm nhìn dường như không thể là điều khiến cho sự đổi mới và tiến bộ công nghệ trở nên khả thi và mang tính xã hội.
            </p>
          </div>
        </div>
        <div className="row pb-3">
          <div className="col-md-12 d-flex justify-content-center">
            <div className="mb-5 flex-center">
              <a href="https://www.facebook.com/HondaMotorArgentina/?fref=ts" className="fb-ic">
                <i className="icon-red bi-facebook fa-lg text-muted mr-4"> </i>
              </a>
              <a href="https://www.instagram.com/hondamotosargentina/" className="fb-ic">
                <i className="icon-red bi-instagram fa-lg text-muted mr-4"> </i>
              </a>
              <a href="https://twitter.com/hondaargentina/" className="fb-ic">
                <i className="icon-red bi-twitter fa-lg text-muted mr-4"> </i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-muted text-center py-3">© 2020 Copyright:
        <a className="text-muted" href="https://www.honda.com.ar/copyright.php">(c) 2021 Honda Motor de Argentina S.A. - Todos los derechos reservados.</a>
      </div>
    </footer>
  );
}

export default Footer;
