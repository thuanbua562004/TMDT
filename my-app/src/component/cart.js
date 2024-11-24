import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, deleteItemsCart, updateNumberItems } from '../slide/counterSlider';
import toast, { Toaster } from 'react-hot-toast';

function Cart() {
  const [phone, setPhone] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.counter.cart);
  const dispatch = useDispatch();
  const id = localStorage.getItem('id');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');

  // Fetch phone from localStorage on component mount
  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    setPhone(storedPhone || ''); // Set phone number or empty string if not available
  }, []);

  // Fetch the cart when the component is mounted
  useEffect(() => {
    if (id) {
      dispatch(fetchCart(id));
    }
  }, [dispatch, id]);

  // Calculate the total price whenever the cart is updated
  useEffect(() => {
    if (cart[0]?.details) {
      let total = 0;
      cart[0].details.forEach((product) => {
        total += product.price * product.number; // Include quantity in price calculation
      });
      setTotalPrice(total);
    }
  }, [cart]);

  // Handle deleting a product from the cart
  const deleteProduct = (productId) => {
    dispatch(deleteItemsCart({ id_pro: productId, id_user: id }));
    toast.success('Xóa sản phẩm thành công');
  };

  const handleDecrease = (productId, number) => {
    if (number === 1) return;
    dispatch(updateNumberItems({ id_pro: productId, id_user: id, number: number - 1 }));
  };

  const handleIncrease = (productId, number) => {
    dispatch(updateNumberItems({ id_pro: productId, id_user: id, number: number + 1 }));
  };

  // Handle VNPAY payment
  const handleVnpay = async () => {
    try {
      const response = await axios.post('http://localhost:8080/order/create_payment_url', {
        amount: totalPrice ,phone: phone
      });
      if (response.status === 200 && response.data) {
        window.location.href = response.data;
      } else {
        alert('Error: Payment URL creation failed.');
      }
    } catch (error) {
      console.error('Error during VNPAY request:', error.response || error.message);
      alert('An error occurred while processing the payment.');
    }
  };

  // Update phone number and save it to localStorage when the user changes it
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    localStorage.setItem('phone', newPhone); 
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card shadow-sm rounded-3">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">
                          Giỏ Hàng
                          {(!cart[0]?.details || cart[0].details.length === 0) && <span> Trống</span>}
                        </h1>
                      </div>
                      <hr className="my-4" />
                      {/* Display the cart items */}
                      {cart[0]?.details?.map((product) => (
                        <div className="row mb-4 d-flex justify-content-between align-items-center" key={product.id}>
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={product.imgProduct || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp'}
                              className="img-fluid rounded-3"
                              alt={product.nameProduct}
                            />
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <h6 className="text-dark">{product.nameProduct}</h6>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleDecrease(product.id_product, product.number)}
                            >
                              -
                            </button>
                            <span className="mx-2">{product.number}</span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => handleIncrease(product.id_product, product.number)}
                            >
                              +
                            </button>
                          </div>

                          <div className="col-md-3 col-lg-2 col-xl-3 offset-lg-1">
                            <h6 className="mb-0">
                              Giá: {(product.price * product.number).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} VNĐ
                            </h6>
                          </div>
                          <div className="col-md-1 col-lg-2 col-xl-1 text-end">
                            <button className="btn btn-outline-danger mt-2" onClick={() => deleteProduct(product.id_product)}>
                              <i className="fas fa-trash-alt" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <hr className="my-4" />
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="/" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2" />
                            Trở lại cửa hàng
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>

                  {/* Display the payment details */}
                  {(cart[0]?.details && cart[0].details.length > 0) && (
                    <div className="col-lg-4 bg-light shadow-lg rounded-3 p-4">
                      <div className="p-3">
                        <h3 className="fw-bold mb-4 text-center text-uppercase">Hóa đơn</h3>
                        <hr className="my-4" />

                        {/* Customer Information */}
                        <div className="mb-3">
                          <h5 className="mb-2"><strong>Tên Người Nhận:</strong> {name}</h5>
                          <h5 className="mb-3">
                            <strong>Số điện thoại:</strong>
                            <input
                              type="text"
                              className="form-control"
                              value={phone}
                              onChange={handlePhoneChange} // Update state and localStorage when user types
                            />
                          </h5>
                          <h5 className="mb-2"><strong>Email:</strong> {email}</h5>
                        </div>

                        {/* Shipping Information */}
                        <h5 className="text-uppercase mb-3">Vận chuyển</h5>
                        <div className="mb-4">
                          <select className="form-select shadow-sm">
                            <option value={1}>Nhận tại cửa hàng</option>
                          </select>
                        </div>

                        <hr className="my-4" />

                        {/* Total Price Section */}
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">Tổng tiền </h5>
                          <h5 className="fw-bold text-danger">{totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5>
                        </div>

                        {/* Payment Button */}
                        <div className="d-grid gap-2">
                          <button type="button" onClick={handleVnpay} className="btn btn-dark btn-lg shadow-lg">
                            Thanh toán
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </section>
  );
}

export default Cart;
