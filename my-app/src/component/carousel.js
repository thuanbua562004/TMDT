import React from 'react';

function Carousel() {
  return (
    <>
    <div className="container-fluid p-0">
      <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-header carousel-inner">
          <div className="carousel-item active" data-interval="5000">
            <img src="/images/image-carusel1.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>BẠN CÓ THỂ SỐNG HOẶC CẢM NHẬN SỐNG</h2>
              <p className="p-carousel-main">Tìm hiểu tất cả các mô hình chúng tôi có trong danh mục của chúng tôi.</p>
            </div>
          </div>
          <div className="carousel-item" data-interval="5000">
            <img src="/images/image-carusel2.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>HƠN 72 NĂM LÀM LỊCH SỬ</h2>
              <p className="p-carousel-main">đưa bạn đến mọi nơi trên thế giới.</p>
            </div>
          </div>
          <div className="carousel-item" data-interval="5000">
            <img src="/images/image-carusel3.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h2>TÔI BIẾN GIẤC MƠ CỦA BẠN THÀNH THỰC TẾ</h2>
              <p className="p-carousel-main">Hãy sở hữu chiếc xe máy mà bạn hằng mơ ước ngay hôm nay với nguồn tài chính tốt nhất trên thị trường.</p>
              <button type="button" className="btn btn-danger btn-lg">Xem danh mục</button>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
    <h3 id="motorcycles" className="title-information text-center text-uppercase text-muted p-5">
    KHÁM PHÁ HONDA CỦA BẠN
    </h3>
    </>
    
  );
}

export default Carousel;
