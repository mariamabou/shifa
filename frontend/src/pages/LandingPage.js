//LandingPage.js

// This page should present the Logo and allow the user to continue

// Potentially add a sign in and sign out option with user registration? 

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    const styles = {
        page: {
            backgroundColor: '#fffff', 
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
            marginBottom: '30px',
        },
        button: {
            padding: '15px 30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
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
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007BFF')}
            >
                Let's Begin!
            </button>
        </div>
    );
}
