import http from 'node:http';
import formidable, {errors as formidableErrors} from 'formidable';

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(async (req, res) => {
  const form = formidable({});
  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error(err);
    res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain'});
    res.end(String(err));
    return;
  }
  console.log("File Found")
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ fields, files }, null, 2));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});