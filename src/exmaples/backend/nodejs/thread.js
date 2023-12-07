const http = require('http');
const { createHmac } = require('node:crypto');
process.env.UV_THREADPOOL_SIZE = 2;


const secret = 'abcdefg';


const server = http.createServer((req, res) => {


const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
               res.writeHead(200, { 'Content-Type': 'application/json' });

               res.write(hash);
        res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Report 

// ab -n 1000 -c 100  http://localhost:3000/ 

// Requests per second:    6301.04 [#/sec] (mean)

// 1
// Requests per second:    11382.65 [#/sec] (mean)


// Requests per second:    9770.25 [#/sec] (mean) 1
// Requests per second:    11909.94 [#/sec] (mean) 2
// Requests per second:    10983.76 [#/sec] (mean) 3







// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
  // Allow requests only to the /encrypt endpoint



//   if (req.url === '/encrypt' && req.method === 'POST') {
//     let data = '';

//     // Collect request data
//     req.on('data', chunk => {
//       data += chunk;
//     });

//     // Process request data
//     req.on('end', () => {
//       try {
//         // Parse the JSON data from the request
//         const jsonData = JSON.parse(data);

//         // Encrypt the provided string using a simple algorithm (replace with your preferred encryption method)
//         const cipher = crypto.createCipher('aes-256-cbc', secretKey);
//         let encryptedString = cipher.update(jsonData.text, 'utf8', 'hex');
//         encryptedString += cipher.final('hex');

//         // Send the encrypted string as the response
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ encryptedString }));
//       } catch (error) {
//         // Handle JSON parsing or encryption errors
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ error: 'Invalid JSON or encryption error' }));
//       }
//     });
//   } else {
//     // Handle other endpoints or methods
//     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     res.end('Not Found');
//   }
