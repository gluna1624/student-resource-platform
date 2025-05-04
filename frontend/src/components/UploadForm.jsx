import { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

const UploadForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !file) {
            alert('Title and file are required');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description || '');
        formData.append('file', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/resources`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Resource uploaded: ' + response.data.resource_id);
            setTitle('');
            setDescription('');
            setFile(null);
        } catch (error) {
            alert(error.response?.data?.error || 'Upload failed');
        }
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                required
            />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;