import http from 'node:http';
import fs from 'node:fs';
import formidable from 'formidable';
import receive_data from './apis.js';

const server = http.createServer((req, res) => {
  console.log("Request Recieved");

  // Check API endpoint
  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    const form = formidable({});

    // Get image file
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
      }

      console.log("File Info:\n" + files.photo[0].filepath);

      // Add file to correct directory
      fs.rename(files.multipleFiles[0].filepath, '{Save Directory Here}', (err) => {
        if (err) throw err;
        console.log("File Successfully Saved");
      });

      // Get Teseract and GPT results
      let api_res = await receive_data();
      console.log("API Results: " + api_res);
      
      // Return API info
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });

    return;
  }

  // Generate test web page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h2>File Upload Test Server</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div> Title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="photo" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000/ ...');
});
