
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please choose a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(' http://localhost:8000/process_image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage(`Image uploaded successfully. Server response: ${data}`);
        // You can handle the success response from the server here
      }
    } catch (error) {
      setResponseMessage(`Error uploading image. Server response: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;

