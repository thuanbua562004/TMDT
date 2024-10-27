import React from 'react';

function About() {
  return (
    <>
      <h3 className="title-information text-center text-uppercase text-muted p-5">
      Hơn 72 năm cùng nhau làm nên lịch sử
      </h3>
      <div className=" container   ">
        <div>
          <div className="extra-Information row">
            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/seguridad-icon.png" alt="" />
                <h4>Bảo vệ</h4>
              </div>
              <div className="descripcion-card">
                <p>
                Chúng tôi bảo hiểm xe máy của bạn ngay tại chỗ với Triunfo Seguros với phạm vi bảo hiểm tốt nhất và hỗ trợ phù hợp với nhu cầu của bạn..
                </p>
              </div>
            </div>

            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/facilidades.icon.png" alt="" />
                <h4>Sự quản lý</h4>
              </div>
              <div className="descripcion-card">
                <p>
                Nhóm của chúng tôi sẽ chịu trách nhiệm xử lý tất cả các tài liệu cho chiếc xe của bạn.
                </p>
              </div>
            </div>
            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/garantia-icon.png" alt="" />
                <h4>Cơ sở
                </h4>
              </div>
              <div className="descripcion-card">
                <p>
                Chúng tôi coi chiếc xe máy đã qua sử dụng của bạn như một phần thanh toán để bạn có được chiếc xe máy mà bạn luôn mơ ước.
                </p>
              </div>
            </div>
            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/stock-icon.png" alt="" />
                <h4>Cổ phần</h4>
              </div>
              <div className="descripcion-card">
                <p>
                Chúng tôi có tất cả các mẫu để cung cấp cho bạn tất cả các khả năng trên thị trường ở cùng một nơi.
                </p>
              </div>
            </div>
            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/financiacion-icon.png" alt="" />
                <h4>Tài chính</h4>
              </div>
              <div className="descripcion-card">
                <p>
                Chúng tôi đã ký một thỏa thuận độc quyền với Banco Provincia cho phép chúng tôi cung cấp cho bạn 18 khoản trả góp cố định.
                </p>
              </div>
            </div>
            <div className="nested-grid col-4 ">
              <div className="title-card">
                <img className="img" src="./images/gestion.icon.png" alt="" />
                <h4>Bảo vệ</h4>
              </div>
              <div className="descripcion-card">
                <p>
                Chúng tôi bảo hiểm xe máy của bạn ngay tại chỗ với Triunfo Seguros với phạm vi bảo hiểm tốt nhất và hỗ trợ phù hợp với nhu cầu của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
