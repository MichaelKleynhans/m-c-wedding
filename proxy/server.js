const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Enable CORS for your GitHub Pages site
app.use(cors({
  origin: 'https://michaelkleynhans.github.io/m-c-wedding/',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy endpoint to forward RSVP requests to Google Apps Script
app.post('/rsvp', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbxlcZ4jGgi4M242V-u3UOpdx7f2ij8oGo7u6K6B5vzPZYZ2a2NYVbhl2_q9F0T4aIs9/exec',
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: 'Failed to submit RSVP' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});