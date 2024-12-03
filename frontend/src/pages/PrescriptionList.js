import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]); // List of prescriptions
    const [selectedPrescription, setSelectedPrescription] = useState(null); // Selected prescription for popup

    // Fetch prescriptions from the backend
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/prescriptions'); // Fetch prescriptions
                setPrescriptions(response.data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    const styles = {
        page: {
            backgroundColor: '#E3F0FF',
            color: '#EE7B30',
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            height: '100vh',
        },
        scrollContainer: {
            height: '300px',
            overflowY: 'auto',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#3D5A80',
            borderRadius: '8px',
            padding: '10px',
        },
        card: {
            backgroundColor: '#2B3A67',
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        popupContent: {
            backgroundColor: '#3D5A80',
            borderRadius: '12px',
            padding: '20px',
            width: '80%',
            maxWidth: '400px',
            textAlign: 'center',
            color: '#fff',
        },
        closeButton: {
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#2B3A67',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
        },
        addButton: {
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#3D5A80',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
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
                        onClick={() => setSelectedPrescription(prescription)} // Open popup with prescription details
                    >
                        {prescription.name} {/* Display only the name */}
                    </div>
                ))}
            </div>

            {selectedPrescription && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popupContent}>
                        <h2>Name: {selectedPrescription.name}</h2>
                        <p>
                            <strong>Frequency:</strong> {selectedPrescription.frequency}
                        </p>
                        <p>
                            <strong>Description:</strong> {selectedPrescription.description}
                        </p>
                        <button
                            style={styles.closeButton}
                            onClick={() => setSelectedPrescription(null)} // Close popup
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <button
                style={styles.addButton}
                onClick={() => window.location.href = '/image-scanner'}
            >
                Add More
            </button>
        </div>
    );
};

export default PrescriptionPage;
