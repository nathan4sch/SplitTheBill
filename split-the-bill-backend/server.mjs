import http from 'node:http';
import formidable, {errors as formidableErrors} from 'formidable';

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (req, res) => {
  // Generate form for parsing
  const form = formidable({});
  let fields;
  let files;
  try {
    // Get files and fields from parse
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error(err);
    res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain'});
    res.end(String(err));
    return;
  }

  // Check if file is found
  console.log(files.file.name);
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

