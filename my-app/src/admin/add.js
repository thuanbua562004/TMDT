import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";

function Add() {
    const [nameCatalog, setNameCatalog] = useState("");
    const [dataCata, setdataCata] = useState([]);

    const [listProduct, setListProduct] = useState([]);

    const handleAddCatalog = async () => {
        const res = await axios.post("http://localhost:8080/catalog", { name: nameCatalog });
        if (res) {
            setdataCata((prevData) => [...prevData, { _id: res.data._id, nameCatalog }]);
            console.log(dataCata)
        }
    };
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/catalog?id=${id}`);
            if (res) {
                console.log(res);
                setdataCata(dataCata.filter(catalog => catalog._id !== id));

            }
        } catch (error) {
            console.error("Error deleting catalog:", error);
            alert("Xóa thất bại. Vui lòng thử lại!"); 
        }
    };
    const handleDeletePro = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/product?id=${id}`);
            if (res) {
                console.log(res);
                setListProduct(listProduct.filter(pro => pro.id !== id));
                alert("Xóa thành công!");
            }
        } catch (error) {
            console.error("Error deleting catalog:", error);
            alert("Xóa thất bại. Vui lòng thử lại!"); 
        }
    };

    useEffect(() => {
        const handleFetchCatalog = async () => {
            const res = await axios.get("http://localhost:8080/catalog")
            if (res) {
                console.log(res.data)
                setdataCata(res.data)
            }
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
                }
            }
            handlerFetchProduct();
        }

        handleFetchCatalog()
    }, []);

    return (
        <>
            {/* Bootstrap Scripts */}
            <script
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
                integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
                crossOrigin="anonymous"
            ></script>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
                integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
                crossOrigin="anonymous"
            ></script>
    
            <div className="container my-5">
                <div className="row g-4">
                    {/* Left Column - Product List */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h2 className="mb-0">Danh Sách Sản Phẩm
                                <div className="card-footer text-end">
                                <a
                                    href="addpro"
                                    className="btn btn-success text-uppercase"
                                >
                                    Thêm Sản Phẩm Mới
                                </a>
                            </div>
                                </h2>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-hover text-center align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col">Tên Sản Phẩm</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Hãng</th>
                                            <th scope="col">Ngày Thêm</th>
                                            <th scope="col">Hành Động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProduct.map((product) => (
                                            <tr key={product.id}>
                                                <td>
                                                    <Link
                                                        to={`/admin/update/${product.id}`}
                                                        className="text-decoration-none text-primary fw-bold"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                </td>
                                                <td>{product.price.toLocaleString()} VND</td>
                                                <td>{product.category}</td>
                                                <td>{product.dateAdded || "21 Jan 2019"}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeletePro(product.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                     
                        </div>
                    </div>
    
                    {/* Right Column - Product Categories */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-secondary text-white">
                                <h2 className="mb-0">Danh Mục Sản Phẩm</h2>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        {dataCata.map((data) => (
                                            <tr key={data._id} >
                                                <td className="d-flex align-items-center">
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/640px-Honda_Logo.svg.png"
                                                        alt="logo"
                                                        className="me-3"
                                                        style={{ width: "20px" }}
                                                    /> {data.nameCatalog}
                                                </td>
                                                <td className="text-end">
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(data._id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer text-end">
                                <button
                                    className="btn btn-primary text-uppercase"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    Thêm Danh Mục Mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Modal for Adding New Category */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Thêm Danh Mục Mới
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    id="catalogInput"
                                    name="nameCatalog"
                                    placeholder="Nhập tên danh mục"
                                    value={nameCatalog}
                                    onChange={(e) => setNameCatalog(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddCatalog}
                                    data-bs-dismiss="modal"
                                >
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Add;