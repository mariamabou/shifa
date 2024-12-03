import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const { text } = location.state;

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
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
        },
        header: {
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'left',
            marginBottom: '20px',
        },
        section: {
            marginBottom: '15px',
        },
        sectionTitle: {
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '8px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>Results</div>
            <div style={styles.card}>
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Medicine Name:</div>
                    <div>{text.split('\n')[0].replace('Medicine: ', '')}</div>
                </div>
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Dosage Instructions:</div>
                    <div>
                        {text.includes('Frequency:') ? 
                            text.split('Frequency:')[1].split('Description:')[0].trim() : 
                            'Dosage information not available'}
                    </div>
                </div>
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>Description:</div>
                    <div>
                        {text.includes('Description:') ? 
                            text.split('Description:')[1].trim() : 
                            'Description not available'}
                    </div>
                </div>
            </div>
            <button style={styles.button} onClick={handleAddPrescription}>
                Add to Prescription
            </button>
        </div>
    );
}
