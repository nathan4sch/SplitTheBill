const fs = require('fs');

const filePath = 'receipt.jpg';
const url = 'http://localhost:3000';

// Read the file as a Buffer
const fileBuffer = fs.readFileSync(filePath);

// Create FormData and append the file
const formData = new FormData();
formData.append('file', new Blob([fileBuffer]), 'image.jpg');

// Make the POST request using fetch
fetch(url, {
  body: formData,
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));