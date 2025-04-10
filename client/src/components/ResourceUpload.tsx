import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResourceUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null); // Added for file input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Use FormData for file uploads
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (file) formData.append('file', file); // Add file if selected

    try {
      await axios.post('http://localhost:5001/resources', formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data' // Required for file uploads
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error uploading resource:', error);
    }
  };

  return (
    <div className="container">
      <h2>Upload Resource</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ display: 'block', margin: '1rem 0', width: '100%', height: '100px' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        >
          <option value="">Select Category</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
          <option value="CS">Computer Science</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: 'block', margin: '1rem 0' }}
        /> {/* Added file input */}
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', background: '#ff4b5c', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Upload
        </button>
      </form>
    </div>
  );
}