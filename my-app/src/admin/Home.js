import { Outlet, Link } from 'react-router-dom';

function Home (){
    return(<>
       <div className="container-fluid">
          <div className="row">
            {/* Card for Product List */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm bg-success text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Danh sách sản phẩm</h5>
                  <p className="card-text">Xem tất cả các sản phẩm trong cửa hàng.</p>
                  <Link to="/admin/add" className="btn btn-light">Xem ngay</Link>
                </div>
              </div>
            </div>

            {/* Card for Orders */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm bg-info text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Đơn hàng</h5>
                  <p className="card-text">Quản lý và xem các đơn hàng đã đặt.</p>
                  <Link to="/admin/history" className="btn btn-light">Xem ngay</Link>
                </div>
              </div>
            </div>

            {/* Card for Add Product */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm bg-warning text-white">
                <div className="card-body text-center">
                  <h5 className="card-title">Thêm sản phẩm</h5>
                  <p className="card-text">Thêm các sản phẩm mới vào cửa hàng của bạn.</p>
                  <Link to="/admin/add" className="btn btn-light">Thêm ngay</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>)
}
export default Home