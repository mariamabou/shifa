import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]); 
    const [selectedPrescription, setSelectedPrescription] = useState(null); 

    // Fetch prescriptions from the backend
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/prescriptions'); 
                setPrescriptions(response.data); 
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };
    
        fetchPrescriptions();
    }, []);    

    const styles = {
        page: {
            backgroundColor: '#E3F0FF',
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            height: '100vh',
            overflow: 'hidden',
        },
        scrollContainer: {
            height: '300px',
            overflowY: 'auto',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#282828',
            borderRadius: '8px',
            padding: '10px',
        },
        card: {
            backgroundColor: '#181818',
            border: '1px solid #333',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '10px',
            textAlign: 'center',
            color: '#fff',
        },
        popupOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        popupContent: {
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            width: '80%',
            maxWidth: '400px',
            textAlign: 'center',
        },
        closeButton: {
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#1DB954',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
        },
        addMoreButton: {
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#007BFF', // blue button
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px', 
        },
    };

    return (
        <div style={styles.page}>
            <h1>Prescriptions</h1>
            <div style={styles.scrollContainer}>
                {prescriptions.map((prescription, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        onClick={() => setSelectedPrescription(prescription)} 
                    >
                        {prescription.name} 
                    </div>
                ))}
            </div>

            {/* Add More Button */}
            <button
                style={styles.addMoreButton}
                onClick={() => window.location.href = '/image-scanner'} 
            >
                Add more
            </button>

            {selectedPrescription && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        <h2>{selectedPrescription.name}</h2>
                        <p>{selectedPrescription.details}</p>
                        <button
                            style={styles.closeButton}
                            onClick={() => setSelectedPrescription(null)} 
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrescriptionPage;



