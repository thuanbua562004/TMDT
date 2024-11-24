import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Historybuy() {
  const [orders, setOrders] = useState([]);
  const id_user = localStorage.getItem('id');

  // Hàm lấy lịch sử mua hàng
  const getHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/historyBuy/${id_user}`);
      if (response) {
        setOrders(response.data);
        console.log(orders);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch sử:", error);
    }
  };

  // Sử dụng useEffect để gọi API chỉ một lần khi component được render
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lịch Sử Đơn Hàng</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã Đơn Hàng</th>
              <th scope="col">Ngày Đặt</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Hình Ảnh</th>
              <th scope="col">Tổng Tiền</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, orderIndex) => (
                <React.Fragment key={`order-${orderIndex}`}>
                  {order.products.map((product, productIndex) => (
                    <tr key={`${order.orderId}-${productIndex}`}>
                      {/* Hiển thị thông tin orderId, orderDate, và status ở dòng đầu tiên của mỗi đơn hàng */}
                      {productIndex === 0 && (
                        <>
                          <td rowSpan={order.products.length} className="align-middle">
                            <strong>{order.orderId}</strong>
                          </td>
                          <td rowSpan={order.products.length} className="align-middle">
                            {order.orderDate}
                          </td>
                          <td rowSpan={order.products.length} className="align-middle">
                            {order.phone}
                          </td>
                        </>
                      )}
                      {/* Hiển thị thông tin sản phẩm */}
                      <td>{product.name}</td>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid rounded"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      {/* Hiển thị tổng thanh toán ở dòng cuối cùng của đơn hàng */}
                      {productIndex === 0 && (
                        <td rowSpan={order.products.length} className="align-middle text-end">
                          <strong>{parseInt(order.totalAmount).toLocaleString('vi-VN')} VND</strong>
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Chưa có đơn hàng nào được tìm thấy!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Historybuy;
