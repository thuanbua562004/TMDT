import React from 'react';

function Product() {
  return (
    <>
      <h5 className="title-information text-center text-uppercase p-3">
      Những mẫu bán chạy nhất<strong>(ƯU ĐÃI -30%)</strong>
      </h5>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3">
          <div className="col mb-4">
            <a className="text-dark text-decoration-none" href="/error-404.html">
              <div className="card h-100">
                <img
                  src="/images/Producto-destacado-1.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body justify-content-center text-center">
                  <h4 className="card-title">WAVE-110S</h4>
                  <i className="bi bi-cash-stack"></i>
                  <h5 className="card-text">18.000.000 VNĐ</h5>
                  <p className="card-text">
                    <del>22.000.000 VNĐ</del>
                  </p>
                </div>
              </div>
            </a>
            <button  style={{width:"100%"}} className="button-gen btn btn-danger">
              <i className="bi bi-cart-plus-fill p-2"></i> Xem Thông Tin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
