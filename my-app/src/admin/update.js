import React, { useEffect, useState } from "react";
import axios from 'axios';
import ImageUpload from './addimg';
import {useParams ,useNavigate  } from 'react-router-dom'
function Update() {
    const [dataCata, setdataCata] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    let navigate = useNavigate();
    const handleImageUpload = (imageUrl) => {
        setUploadedImages((prevImages) => [...prevImages, { imageUrl: imageUrl }]);
    };


    useEffect(() => {
        const handleFetchCatalog = async () => {
            const res = await axios.get("http://localhost:8080/catalog");
            if (res) {
                setdataCata(res.data);
            }
        };

        handleFetchCatalog();
    }, []);

    const id =useParams().id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name,
            price,
            date,
            description,
            category,
            img1: uploadedImages[0]?.imageUrl || "", 
            img2: uploadedImages[1]?.imageUrl || "", 
            img3: uploadedImages[2]?.imageUrl || ""
        };
        


        try {
            const response = await axios.put(`http://localhost:8080/product/${id}`, productData);
            if(response){
                navigate("/add")
            }
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error.message);
        }
        
    };

    return (
        <div className="container tm-mt-big tm-mb-big">
            <div className="row">
                <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                    <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="tm-block-title d-inline-block">Cập Nhật Sản Phẩm</h2>
                            </div>
                        </div>
                        <div className="row tm-edit-product-row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <form onSubmit={handleSubmit} className="tm-edit-product-form">
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Tên Sản Phẩm</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            className="form-control validate"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="description">Mô Tả</label>
                                        <textarea
                                            className="form-control validate"
                                            rows={3}
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="category">Chọn Loại Xe</label>
                                        <select
                                            className="custom-select tm-select-accounts"
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="" disabled>Select category</option>
                                            {dataCata.map((data, index) => (
                                                <option key={index} value={data.nameCatalog}>
                                                    {data.nameCatalog}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="row">
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label htmlFor="expire_date">Ngày Thêm</label>
                                            <input
                                                id="expire_date"
                                                name="expire_date"
                                                type="date"
                                                className="form-control validate"
                                                data-large-mode="true"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label htmlFor="price">Giá Sản Phẩm</label>
                                            <input
                                                id="price"
                                                name="price"
                                                type="number"
                                                className="form-control validate"
                                                required
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                                <ImageUpload onImageUpload={handleImageUpload} />
                                <ImageUpload onImageUpload={handleImageUpload} />
                                <ImageUpload onImageUpload={handleImageUpload} />
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block text-uppercase"
                                    onClick={handleSubmit}
                                >
                                    Add Product Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Update;
