import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ImageScanner() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:3001/process-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const extractedText = response.data.description;
            navigate('/results', { state: { text: extractedText } });
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to process the image. Please try again.');
        }
    };

    const styles = {
        page: {
            backgroundColor: '#121212',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#282828',
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
        },
        input: {
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #333',
            borderRadius: '8px',
            width: '100%',
            color: '#fff',
            backgroundColor: '#181818',
        },
        button: {
            padding: '10px 20px',
            margin: '10px 0',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
        },
        error: {
            color: '#ff4d4d',
            margin: '10px 0',
        },
    };

    return (
        <div style={styles.page}>
            <h1>Image Scanner</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>
                    Upload and Process
                </button>
            </form>
        </div>
    );
}
