import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Suggetion from './Suggetion';




const ImageCard = ({ image }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
    <img src={`https://dealy-dress-colur-suggestion-backend.onrender.com/${image.imageUrl}`} alt={image.title} style={{ maxWidth: '100%', height: 'auto' }} />
    <h3>{image.title}</h3>
    <p>{image.description}</p>
    <p><strong>Dress Type:</strong> {image.dressType}</p> {/* Display Dress Type */}
    <p><strong>Color:</strong> {image.color}</p> {/* Display Color */}
  </div>
);

function Alldatas() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://dealy-dress-colur-suggestion-backend.onrender.com/images');
        
        // Modify the imageUrl field in each image object
        const updatedImages = response.data.map(image => ({
          ...image,
          imageUrl: image.imageUrl.replace('uploads\\', '') // Remove "uploads\\" from the imageUrl
        }));

        setImages(updatedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
    <div className='cont'>
      <h1>Uploaded Images & Datas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
    <Suggetion />
    </div>
  );
}

export default Alldatas;
