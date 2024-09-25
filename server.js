const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to trigger image generation
app.post('/api/generate', async (req, res) => {
    const { num_images } = req.body; // Accept number of images from request body

    try {
        const response = await axios.post('http://127.0.0.1:5000/generate', {
            num_images: num_images || 5  // Default to 5 images if none provided
        });
        
        // Forward the images array to the frontend
        res.json(response.data); // Send the whole response including images
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send('Image generation failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
