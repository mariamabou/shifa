const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// In-memory storage for prescriptions
let prescriptions = [];

// Set up multer for image upload
const upload = multer({ dest: 'uploads/' });

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: 'sk-vmZcQ1enDLvyCydGfxNqygbNIk9QMUUZ80JeE7FCSqT3BlbkFJoS7LzpEcKYKBIL-VhXGZPxsBXjjOvf328DI2bqGp8A', // Replace with your actual OpenAI API key
});

app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        const result = await Tesseract.recognize(imagePath, 'eng');
        const extractedText = result.data.text;

        const examples = fs.readFileSync(path.join(__dirname, 'text_files', 'examples.txt'), 'utf-8');
        const guidelines = fs.readFileSync(path.join(__dirname, 'text_files', 'text_guidelines.txt'), 'utf-8');

        const prompt = `
        An image of a medical pill bottle and prescription was fed through an OCR package and produced the following text: 
        "${extractedText}"

        Based on this text, generate a simple, user-friendly description of the medicine and its uses. 
        DO NOT include the prescription number, quantity of pills inside the bottle, or any extraneous information.

        Examples:
        ${examples}

        Guidelines:
        ${guidelines}
        `;

        
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
            max_tokens: 200,
            temperature: 0.8,
        });

        const generatedResponse = response.choices[0].message.content.trim();
        res.json({ success: true, description: generatedResponse });
    } catch (error) {
        console.error('Error processing image:', error.message);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        fs.unlinkSync(req.file.path);
    }
});

// Add Prescription Endpoint
app.post('/add-prescription', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, message: 'Prescription name is required.' });
    }

    // Example structure for prescriptions
    const prescription = {
        name: name.split('\n')[0].replace('Medicine: ', ''),
        details: name.split('\n')[1] || 'No additional details available.', 
    };

    prescriptions.push(prescription); // Push structured data into the array
    console.log('Prescriptions:', prescriptions); 
    res.json({ success: true, message: 'Prescription added successfully.' });
});


// Get Prescriptions Endpoint
app.get('/prescriptions', (req, res) => {
    console.log('Sending prescriptions:', prescriptions); 
    res.json(prescriptions); // Send the array of structured objects
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Backend server is running at http://localhost:${port}`);
});
