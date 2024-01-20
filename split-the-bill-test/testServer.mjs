import fs from 'fs';

const testImagePath = 'c86.jpg';
const uploadUrl = 'http://127.0.0.1:3000';

// Create a FormData object and append the image file
const formData = new FormData();
formData.append('file', fs.createReadStream(testImagePath));

// Make the fetch request
fetch(uploadUrl, {
  method: 'POST',
  body: formData,
})
  .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });