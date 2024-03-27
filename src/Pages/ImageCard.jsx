import React from 'react';
import Button from 'react-bootstrap/Button';
import { FcLike } from "react-icons/fc";
import './Suggetion.css'


const ImageCard = ({ image, onLike }) => {
  const handleLike = () => {
    onLike(image); // Pass the image data to the parent component when the like button is clicked
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
      <img src={`https://dealy-dress-colur-suggestion-backend.onrender.com/${image.imageUrl}`} alt={image.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <h3>{image.title}</h3>
      <p>{image.description}</p>
      <p><strong>Dress Type:</strong> {image.dressType}</p>
      <p><strong>Color:</strong> {image.color}</p>
      <Button className="btn btn-link" onClick={handleLike}><FcLike /></Button>
   
    </div>
  );
};

export default ImageCard;
