import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageScanner from './pages/ImageScanner';
import Results from './pages/Results';
import PrescriptionList from './pages/PrescriptionList';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ImageScanner />} />
                <Route path="/results" element={<Results />} />
                <Route path="/prescriptions" element={<PrescriptionList />} />
                <Route path="/image-scanner" element={<ImageScanner />} />
            </Routes>
        </Router>
    );
}

export default App;
