import { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filePath, setFilePath] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/resources', {
                title,
                description,
                file_path: filePath,
                user_id: userId,
            });
            alert('Resource uploaded: ' + response.data.resource_id);
        } catch (error) {
            alert('Upload failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                type="text"
                placeholder="File Path (e.g., /uploads/test.pdf)"
                value={filePath}
                onChange={(e) => setFilePath(e.target.value)}
                required
            />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;