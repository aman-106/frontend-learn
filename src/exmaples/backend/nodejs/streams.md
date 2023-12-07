In Node.js, streams are a powerful concept that allow you to efficiently read or write data, especially when dealing with large amounts of data. Streams provide an abstraction for handling I/O operations, making it possible to work with data in chunks, which can be more memory-efficient than processing the entire dataset at once. There are several types of streams in Node.js:

1. **Readable Streams:**
   - Readable streams represent a source from which data can be read. Examples include reading from a file, receiving HTTP requests, or generating data.

   ```javascript
   const fs = require('fs');

   // Creating a readable stream from a file
   const readableStream = fs.createReadStream('example.txt', 'utf8');

   // Handling 'data' event
   readableStream.on('data', (chunk) => {
     console.log('Received a chunk of data:', chunk);
   });

   // Handling 'end' event
   readableStream.on('end', () => {
     console.log('End of file reached');
   });
   ```

2. **Writable Streams:**
   - Writable streams represent a destination to which data can be written. Examples include writing to a file or sending an HTTP response.

   ```javascript
   const fs = require('fs');

   // Creating a writable stream to a file
   const writableStream = fs.createWriteStream('output.txt', 'utf8');

   // Writing data to the stream
   writableStream.write('Hello, ');
   writableStream.write('world!');
   writableStream.end(); // Close the stream
   ```

3. **Duplex Streams:**
   - Duplex streams represent both a readable and a writable side. Examples include network sockets.

   ```javascript
   const net = require('net');

   // Creating a duplex stream with a TCP server
   const server = net.createServer((socket) => {
     // 'socket' is a duplex stream
     socket.pipe(socket); // Echo back data
   });

   server.listen(3000, () => {
     console.log('Server listening on port 3000');
   });
   ```

4. **Transform Streams:**
   - Transform streams are a type of duplex stream where the output is calculated based on the input. They are particularly useful for data manipulation.

   ```javascript
   const { Transform } = require('stream');

   // Creating a transform stream to convert data to uppercase
   const uppercaseTransform = new Transform({
     transform(chunk, encoding, callback) {
       const uppercasedChunk = chunk.toString().toUpperCase();
       this.push(uppercasedChunk);
       callback();
     },
   });

   // Piping a readable stream through the transform stream to a writable stream
   process.stdin.pipe(uppercaseTransform).pipe(process.stdout);
   ```

Streams provide a powerful foundation for working with data in a scalable and memory-efficient way in Node.js. They are extensively used in various built-in modules like `fs`, `http`, and `crypto`, as well as in third-party libraries and frameworks.