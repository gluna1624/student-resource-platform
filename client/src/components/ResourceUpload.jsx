import { useState } from 'react';
import axios from 'axios';

function ResourceUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/resources', { title, description });
      setTitle('');
      setDescription('');
      alert('Resource uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Failed to upload resource.');
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload a Resource</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ResourceUpload;