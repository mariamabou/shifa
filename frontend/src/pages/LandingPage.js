//LandingPage.js

// This page should present the Logo and allow the user to continue

// Potentially add a sign in and sign out option with user registration? 

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const styles = {
        page: {
            backgroundColor: '#E3F0FF', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            color: '#333', 
        },
        logo: {
            width: '200px', 
            marginBottom: '20px',
        },
        button: {
            padding: '15px 30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#3D5A80',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#2B3A67',
        },
    };

    return (
        <div style={styles.page}>
            <img
                src="/logo.png" // Replace with actual logo path
                alt="App Logo"
                style={styles.logo}
            />
            <button
                style={styles.button}
                onClick={() => navigate('/image-scanner')}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#3D5A80')}
            >
                Let's Begin!
            </button>
        </div>
    );
}
