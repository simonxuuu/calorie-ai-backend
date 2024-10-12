const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' })); // Increase limit if needed

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to handle image data upload
app.post('/upload', (req, res) => {
  const imageData = req.body.imageData; // Assuming imageData is a base64 string
  const imageBuffer = Buffer.from(imageData, 'base64');
  const imagePath = path.join(__dirname, 'images', 'uploaded_image.png');

  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).send('Error saving image');
    }
    res.send('Image saved successfully');
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});