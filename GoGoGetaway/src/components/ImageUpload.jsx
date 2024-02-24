import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload({ onUploadSuccess }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedImages([...event.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    // Append each image file to the formData object
    selectedImages.forEach((image) => {
      formData.append('files', image);
    });

    try {
      const response = await axios.post(
        'http://localhost:8080/cloudinaryUpload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // Assuming the response contains the URL of the uploaded images
      // Call the onUploadSuccess function passed from the parent component with the URLs
      onUploadSuccess(response.data.results.map((result) => result.url));
    } catch (error) {
      console.error('Upload error', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
}

export default ImageUpload;
