import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../slide/counterSlider';

function OrderSuccess() {
    const { search } = useLocation();
    const [params, setParams] = useState({});
    const [paymentStatus, setPaymentStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const id = localStorage.getItem('id');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.counter.cart);

    // Hàm format ngày thanh toán
    const formatPayDate = (dateString) => {
        if (!dateString) return "Không có thông tin";
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        const hour = dateString.slice(8, 10);
        const minute = dateString.slice(10, 12);
        const second = dateString.slice(12, 14);
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    };

    // Xử lý trạng thái giao dịch
    const handlePaymentStatus = (transactionStatus) => {
        const statusMessages = {
            "00": "Giao dịch thành công!",
            "02": "Giao dịch thất bại!",
            default: "Trạng thái giao dịch không xác định"
        };
        setPaymentStatus(statusMessages[transactionStatus] || statusMessages.default);
    };

    // Hàm xóa giỏ hàng
    const deleteCart = async () => {
        try {
            const response = await axios.delete('http://localhost:8080/del-cart', {
                data: { id_user: id },
            });
            console.log(response);
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error);
            alert("Có lỗi xảy ra khi xóa giỏ hàng. Vui lòng thử lại!");
        }
    };

    // Hàm lưu lịch sử mua hàng
    const saveHistory = async (paramsObject) => {
        if (!paramsObject.vnp_OrderInfo) {
            console.error("Mã đơn hàng không có giá trị!");
            return;
        }
        const response = await axios.get(`http://localhost:8080/cart/${id}`);

        const list = response.data[0].details.map(item => ({
            productId: item.id_product,
            name: item.nameProduct,
            image: item.imgProduct,
            quantity: item.number,
            price: item.price,
        }));
        try {
            const userAddress = localStorage.getItem('shippingAddress') || "Không có địa chỉ";
            const response = await axios.post('http://localhost:8080/historyBuy', {
                orderId: paramsObject.vnp_OrderInfo,
                userId: id,
                totalAmount: paramsObject.vnp_Amount,
                orderDate: paramsObject.vnp_PayDate,
                phone: localStorage.getItem('phone'),
                products: list,
            });
            console.log(response);
        } catch (error) {
            console.error("Lỗi khi lưu lịch sử:", error);
            alert("Có lỗi xảy ra khi lưu lịch sử mua hàng. Vui lòng thử lại!");
        }
    };
    const isFirstRender = useRef(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin từ URL
                const queryParams = new URLSearchParams(search);
                const paramsObject = {
                    vnp_Amount: queryParams.get("vnp_Amount"),
                    vnp_OrderInfo: queryParams.get("vnp_OrderInfo"),
                    vnp_PayDate: formatPayDate(queryParams.get("vnp_PayDate")),
                    vnp_TransactionStatus: queryParams.get("vnp_TransactionStatus"),
                };
    
                setParams(paramsObject);
                handlePaymentStatus(paramsObject.vnp_TransactionStatus);
    
                // Kiểm tra trạng thái giao dịch trước khi gọi API
                if (paramsObject.vnp_TransactionStatus === '00') {
                    if (isFirstRender.current) {
                        isFirstRender.current = false; // Đánh dấu đã gọi API
                        const res = await saveHistory(paramsObject);
                            await deleteCart();
                    }
                } else {
                    console.warn("Giao dịch không thành công, không thực hiện lưu lịch sử.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                alert("Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau!");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    


    return (
        <div className="container mt-5 text-center">
            <div className="mb-4">
                <i className={`fas fa-check-circle ${paymentStatus === "Giao dịch thành công!" ? 'text-success' : 'text-danger'}`} style={{ fontSize: 80 }} />
            </div>
            <h2 className={paymentStatus === "Giao dịch thành công!" ? "text-success" : "text-danger"}>{paymentStatus}</h2>
            <p className="lead mt-3">
                {paymentStatus === "Giao dịch thành công!" ?
                    "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý." :
                    "Có sự cố với giao dịch. Vui lòng kiểm tra lại!"}
            </p>
            <div className="card mt-4 mb-4">
                <div className="card-header">
                    <h5>Thông tin đơn hàng</h5>
                </div>
                <div className="card-body">
                    <p>
                        <strong>Mã đơn hàng:</strong> {params.vnp_OrderInfo || "Không có thông tin"}
                    </p>
                    <p>
                        <strong>Ngày đặt hàng:</strong> {params.vnp_PayDate || "Không có thông tin"}
                    </p>
                    <p>
                        <strong>Tổng thanh toán:</strong> {params.vnp_Amount ? `${(params.vnp_Amount / 100).toLocaleString('vi-VN')} VND` : "Không có thông tin"}
                    </p>
                </div>
            </div>
            <a href="/" className="btn btn-primary btn-lg mr-2">
                Quay lại trang chủ
            </a>
            <a href="/history" className="btn btn-outline-secondary btn-lg">
                Xem chi tiết đơn hàng
            </a>
        </div>
    );
}

export default OrderSuccess;
