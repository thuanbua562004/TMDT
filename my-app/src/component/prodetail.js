import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Prodetails() {
  const { id } = useParams();  // Destructure id from useParams
  const [listProduct, setListProduct] = useState(null);  // Start with null instead of an empty array
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [comment, setComment] = useState('');
  const userId = localStorage.getItem("id");
  const [listComment, setListComment] = useState([])
  useEffect(() => {
    handlerFetchProduct();
    fetchComments()
  }, [id]);

  // Fetch product details based on the id
  async function handlerFetchProduct() {
    setLoading(true);  // Start loading
    try {
      const res = await axios.get(`http://localhost:8080/product/${id}`);
      if (res && res.data) {
        setListProduct(res.data);
        console.log(res.data);
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }
  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8080/comment/${id}`);
    if (res) {
      console.log(res.data);
      setListComment(res.data);
    } else {
      console.log('No data received');
    }
  }
  const handleAddComment = async () => {
    try {
      const res = await axios.post('http://localhost:8080/comment', {
        content: comment,
        email: localStorage.getItem('email'),
        id_product: id
      });
      window.location.reload();
    } catch (e) {
      toast.error("Vui long nhap noi dung")
    }
  }
  const handleDelete = async(id_comment)=>{
    try {
      const res = await axios.delete('http://localhost:8080/comment', {
        data: { id_comment, id_product:id } 
      });
      window.location.reload();

    } catch (e) {
      toast.error("Error")
    }
  }
  async function handlerAdd(id_product, imgProduct, nameProduct, price) {
    const url = "http://localhost:8080/cart";
    const number = 1;
    if (selectedColor.colorCode == "" || selectedColor.colorCode == null) {
      toast.error("Vui lòng chọn màu!")
      return;
    }

    try {
      const res = await axios.post(url, {
        userId: userId,
        id_product: id_product,
        imgProduct: imgProduct,
        nameProduct: nameProduct,
        number: number,
        price: price,
        color: selectedColor.colorCode
      });
      if (res.status == 500) {
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
      <div className="container mt-5">
        <div className="row">
          {/* Hình ảnh sản phẩm */}
          <div className="col-md-6 text-center">
            <img
              src={selectedColor.imageUrl ? selectedColor.imageUrl : listProduct.colors[0].imageUrl}
              className="img-fluid rounded"
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-6">
            <p>{listProduct.description}</p>
            <h3 className="text-danger">{Number(listProduct.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h3>

            {/* Lựa chọn màu */}
            <h5 className="mt-4">Chọn màu:</h5>
            <div className="d-flex gap-2 ">
              {listProduct.colors.map((color) => (
                <div
                  key={color.colorCode}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-circle ${color.colorCode === selectedColor.colorCode ? "selected-color" : ""}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: color.colorCode,
                    cursor: "pointer",
                    marginRight: "15px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    transform: color.colorCode === selectedColor.colorCode ? "scale(1.2)" : "scale(1)",
                    boxShadow: color.colorCode === selectedColor.colorCode ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "none",
                  }}
                ></div>

              ))}
            </div>

            {/* Nút chức năng */}
            <div className="mt-4 d-flex gap-3">
              <button className="btn btn-danger px-4"
                onClick={() => handlerAdd(listProduct._id, selectedColor.imageUrl, listProduct.name, listProduct.price, selectedColor.colorCode)}

              >
                Them </button>
            </div>
          </div>
        </div>
      </div>



      <div className="card-product mt-5 card mb-5">
        <img
          src={listProduct.image[0].imageUrl || '/images/default-image.jpg'} // Hình ảnh mặc định nếu không có img1
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

      <div className="card-product card mb-5">
        <img
          src={listProduct.image[1].imageUrl || '/images/default-image.jpg'}
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
          src={listProduct.image[2].imageUrl || '/images/default-image.jpg'}
          className="card-img-top w-50 mx-auto d-block"
          alt={listProduct.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title">
          </h5>
          <p className="card-text">
            {listProduct.motor || "No motor description available."}
          </p>
        </div>
      </div>

      <div className="container my-5">
        <>
          <p>
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="true"
              aria-controls="collapseWidthExample"
            >
              Xem Binh Luan
            </button>
          </p>
          <div style={{ minHeight: 120 }}>
            <div
              className="collapse-horizontal collapse show"
              id="collapseWidthExample"
              style={{}}
            >
              <div className="card card-body" style={{ width: 700 }}>
                {/* Phần hiển thị bình luận */}
                <div id="comments-section" className="mb-5">
                  <div className="card mb-3">
                    {listComment && listComment.comments && listComment.comments.length > 0 ? (
                      listComment.comments.map((comment, index) => (
                        <div key={index} className="outer-wrapper">
                          <div className="card-body">
                            <div className="d-flex align-items-start">
                              <img
                                src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_640.png"
                                alt="Avatar"
                                className="rounded-circle me-3"
                                style={{ marginRight: "15px", width: "50px" }}
                              />
                              <div>
                                <h6 className="fw-bold mb-1">{comment.email}</h6>
                                <p className="mt-2">{comment.content}</p>
                                {comment.email === localStorage.getItem('email')? ( <a
                                  href="#"
                                  className="text-danger"
                                  onClick={() => handleDelete(comment._id)}
                                  style={{ fontSize: "14px", cursor: "pointer", textDecoration: "none" }}
                                >
                                  Delete
                                </a>):("")}
                              </div>
                            </div>
                          </div>
                        </div>

                      ))
                    ) : (
                      <div className="card-body text-center">
                        <p className="text-muted">Chưa có bình luận</p>
                      </div>
                    )}
                  </div>

                </div>
                {/* Form thêm bình luận */}
                {userId ? (<div id="comment-form">
                  <h5 className="mb-3">Thêm bình luận</h5>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                      Bình luận
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => { setComment(e.target.value) }}
                      className="form-control"
                      id="comment"
                      rows={3}
                      placeholder="Nhập bình luận của bạn"
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary"
                    onClick={handleAddComment}
                  >
                    Gửi bình luận
                  </button>
                </div>) : (<div className="alert alert-warning" role="alert"> Vui lòng đăng nhập để thêm bình luận. </div>)}

              </div>
            </div>
          </div>
        </>


      </div>

      <Toaster />

    </div>
  );
}

export default Prodetails;
