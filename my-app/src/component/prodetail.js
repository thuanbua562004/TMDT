import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Prodetails() {
  const { id } = useParams();  // Destructure id from useParams
  const [listProduct, setListProduct] = useState(null);  // Start with null instead of an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handlerFetchProduct();
  }, [id]);

  // Fetch product details based on the id
  async function handlerFetchProduct() {
    setLoading(true);  // Start loading
    try {
      const res = await axios.get(`http://localhost:8080/product/${id}`);
      if (res && res.data) {
        setListProduct(res.data);
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);  // Stop loading once the data is fetched
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
      if(res.status ==500){
        toast.error("Vui lòng đăng nhập!")
      }
      if (res && res.data) {
        toast.success("Thêm Vào giỏ thành công!")
        console.log(res.data);
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Sản phẩm đã có trong giỏ hàng!")

    }
  }


  if (loading) {
    return <div>Loading...</div>;  // Show loading text while data is fetching
  }

  // If no product is found, you can display an error message
  if (!listProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container">
      <h3 className="title-information text-center text-uppercase text-muted p-3">{listProduct.name}</h3>

      <div className="card-product card mb-5">
        <img
          src={listProduct.img?.img1 || '/images/default-image.jpg'} // Hình ảnh mặc định nếu không có img1
          className="card-img-top w-50 mx-auto d-block"
          alt={listProduct.name}
        />

        <div className="card-body text-center">
          <h5 className="card-title">HOÀN HẢO ĐỂ BẠN GHI NHỚ</h5>
          <p className="card-text">
            {listProduct.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Repeat for other images and details */}
      <div className="card-product card mb-5">
        <img
          src={listProduct.img?.img2 || '/images/default-image.jpg'}
          className="card-img-top w-50 mx-auto d-block"
          alt={listProduct.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title">THIẾT KẾ
          </h5>
          <p className="card-text">
            {listProduct.design || "No design description available."}
          </p>
        </div>
      </div>

      <div className="card-product card mb-5">
        <img
          src={listProduct.img?.img3 || '/images/default-image.jpg'}
          className="card-img-top w-50 mx-auto d-block"
          alt={listProduct.name}
        />
        <div className="card-body text-center">
          <p className="card-text">
            {listProduct.motor || "No motor description available."}
          </p>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-body text-center">
          <h2 className="card-text">
            {listProduct && listProduct.price ? Number(listProduct.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "Không có giá"}
            <button className="button-gen btn btn-danger "
              onClick={() => handlerAdd(listProduct._id, listProduct.img.img1, listProduct.name, listProduct.price)} // P
              style={{ marginLeft: "20px" }}> Mua ngay</button>
          </h2>
        </div>
      </div>
      <Toaster />

    </div>
  );
}

export default Prodetails;
