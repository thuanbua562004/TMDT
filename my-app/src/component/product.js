import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};

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

  async function handlerAdd(id_product, imgProduct, nameProduct, price) {
    const url = "http://localhost:8080/cart";
    const userId = localStorage.getItem("id");
    const number = 1;

    try {
      const res = await axios.post(url, {
        userId: userId,
        id_product: id_product,
        imgProduct: imgProduct,
        nameProduct: nameProduct,
        number: number,
        price: price
      });
      console.log(res.status)

      if (res && res.data) {
        toast.success("Thêm Vào giỏ thành công!")
        console.log(res.data);
      } else {
        console.log('No data received');
      }
    } catch (error) {
      if(error.status ==500){
        toast.error("Vui lòng đăng nhập!")
      }

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
              <a className="text-dark text-decoration-none" href={`/productdetail/${product.id}`}>
              <div className="card h-100">
                <img
                  src={product.img.img1} // Use img1 for the product image
                  className="card-img-top"
                  alt={product.name} // Use product name for better accessibility
                />
                <div className="card-body justify-content-center text-center">
                  <h4 className="card-title">{product.name}</h4>
                  <i className="bi bi-cash-stack"></i>
                  <h6 className="">
                    Giá: {product && product.price ? Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "Không có giá"}
                  </h6>
                  <p className="card-text">
                    <del>22.000.000 VNĐ</del>
                  </p>
                </div>
              </div>
            </a>
              {/* Corrected: onClick should pass the parameters to the handler */ }
            < button
                style = {{ width: "100%" }}
          onClick={() => handlerAdd(product._id, product.img.img1, product.name, product.price)} // Pass parameters here
          className="button-gen btn btn-danger"
              >
          <i className="bi bi-cart-plus-fill p-2"></i> Thêm vào giỏ hàng
        </button>
      </div>
          ))}
    </div >
      </div >

      <Toaster/>
    </>
  );
}

export default Product;
