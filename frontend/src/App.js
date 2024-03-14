
import React, { useState } from 'react';

const App = () => {
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
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
      // const response = await fetch(' http://localhost:8000/process_image', {
      const response = await fetch(' https://python-test-63qj.onrender.com/process_image', {
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
  const getMessageFromBackend = () => {
    // fetch('http://localhost:8000/response', {
    fetch('https://python-test-63qj.onrender.com/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: message })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setResponse(data.message);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
        setResponse('Error fetching message');
      });
  };
  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={getMessageFromBackend}>Send Message</button>
      <div>
        <p>Response from backend:</p>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;

