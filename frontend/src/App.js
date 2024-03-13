
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);

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
      console.log(data);
      if (response.ok) {
        alert('Image uploaded successfully!');
        // You can handle the success response from the server here
      } else {
        alert('Error uploading image');
        // You can handle the error response from the server here
      }
    } catch (error) {
      console.error('Error:', error);
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

