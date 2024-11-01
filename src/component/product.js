import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    handlerFetchProduct(); // Corrected function name
  }, []);

  async function handlerFetchProduct() {
    const url = "http://localhost:8080/product";
    try {
      const res = await axios.get(url);
      if (res && res.data) {
        setListProduct(res.data);
        console.log(res.data); // Log the received data
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }

  // If loading, show a loading message
  if (loading) {
    return <div>Loading products...</div>;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h5 className="title-information text-center text-uppercase p-3">
        Những mẫu bán chạy nhất<strong>(ƯU ĐÃI -30%)</strong>
      </h5>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-3">
          {listProduct.map((product) => (
            <div className="col mb-4 mt-5" key={product._id}> {/* Use product._id as the key */}
              <a className="text-dark text-decoration-none" href="/error-404.html">
                <div className="card h-100">
                  <img
                    src={product.img.img1}
                    className="card-img-top"
                    alt={product.name} // Use product name for better accessibility
                  />
                  <div className="card-body justify-content-center text-center">
                    <h4 className="card-title">{product.name}</h4>
                    <i className="bi bi-cash-stack"></i>
                    <h5 className="card-text">{product.price}VNĐ</h5>
                    <p className="card-text">
                      <del>22.000.000 VNĐ</del>
                    </p>
                  </div>
                </div>
              </a>
              <button style={{ width: "100%" }} className="button-gen btn btn-danger">
                <i className="bi bi-cart-plus-fill p-2"></i> Xem Thông Tin
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
