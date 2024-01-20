const http = require('node:http');
const formidable = require('formidable');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  /*
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
  */
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    const oldPath = files.file.path;
    const newPath = "test1.jpg";

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error moving file');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded and moved!');
    });
    return;
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});