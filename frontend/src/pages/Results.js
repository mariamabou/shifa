import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    
    const text = location.state?.text || 'No results available. Please upload an image.';

    const handleAddPrescription = async () => {
        try {
            await axios.post('http://localhost:3001/add-prescription', { name: text });
            navigate('/prescriptions'); 
        } catch (error) {
            console.error('Error adding prescription:', error);
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
        content: {
            textAlign: 'center',
            backgroundColor: '#282828',
            padding: '20px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for a clean look
        },
        button: {
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.content}>
                <h1>Results</h1>
                <p>{text}</p>
                {location.state && (
                    <button onClick={handleAddPrescription} style={styles.button}>
                        Add to Prescription
                    </button>
                )}
            </div>
        </div>
    );
}
