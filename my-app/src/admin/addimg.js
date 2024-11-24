import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadComponent = ({ onImageUpload }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData);
            const imageUrl = response.data.filePath;
            onImageUpload(imageUrl);
            alert('Upload successful')
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h2>Tải Lên Hình Ảnh</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Tải Ảnh Lên Server</button>
        </div>
    );
};

export default ImageUploadComponent;
