const uploadPhotoToServer = async (photoUri) => {
  console.log('here')
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      type: 'image/jpeg', // Adjust the content type based on your image format
      name: 'photo.jpg',
    });

    

    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.ok) {
      console.log('Photo uploaded successfully!');
    } else {
      console.error('Failed to upload photo:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error uploading photo:', error.message);
  }
};
  