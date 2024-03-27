import React, { useState } from 'react';
import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';



const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [dressType, setDressType] = useState('');
  const [color, setColor] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('dressType', dressType); // Add dressType to form data
    formData.append('color', color); // Add color to form data

    try {
      const response = await axios.post('https://dealy-dress-colur-suggestion-backend.onrender.com/upload', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response.data.error);
    }

    setTitle('');
    setDescription('');
    setImage(null);
    setDressType('');
    setColor('');
  };

  return (
    <div>
      <div className='login-container'>
        {responseMessage && <Alert variant={responseMessage.includes('successfully') ? 'success' : 'danger'}>{responseMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <input type="text" style={{ color: "CaptionText" }} value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input type="text" style={{ color: "CaptionText" }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <input type="text" style={{ color: "CaptionText" }} value={dressType} onChange={e => setDressType(e.target.value)} placeholder="Dress Type" />
          <input type="text"  style={{ color: "CaptionText" }}value={color} onChange={e => setColor(e.target.value)} placeholder="Color" />
          <input type="file"  onChange={handleImageChange} />
          <button type="submit">Upload Image</button>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostForm;
