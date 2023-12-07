Node.js is designed to be single-threaded and asynchronous by default. However, you can take advantage of multiple CPU cores by running multiple Node.js processes or by using a clustering module to fork child processes that share the same port.

### Option 1: Running Multiple Processes:

One straightforward approach is to run multiple instances of your Node.js application, each on a separate core. This can be done manually or through process management tools like PM2.

1. **Manual Approach:**
   - Start multiple instances manually, specifying different ports for each instance.
     ```bash
     node app.js --port=3000
     node app.js --port=3001
     node app.js --port=3002
     ```
   - Use a load balancer (e.g., Nginx) to distribute incoming requests among these instances.

2. **Using PM2:**
   - Install PM2 globally: `npm install -g pm2`
   - Start your application in cluster mode:
     ```bash
     pm2 start app.js -i max
     ```
     The `-i max` flag tells PM2 to spawn as many instances as there are CPU cores.

### Option 2: Using the Cluster Module:

Node.js includes a built-in `cluster` module that allows you to fork multiple worker processes that share the same port.

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  // Handle process events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Code to run in each worker process
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello from Worker ' + cluster.worker.id);
  });

  app.listen(3000, () => {
    console.log(`Worker ${cluster.worker.id} listening on port 3000`);
  });
}
```

In the example above:

- The master process forks one worker process for each CPU core.
- Each worker process runs the same code.
- Workers share the same port and distribute incoming requests.

Remember to consider session management and shared resources when running multiple instances, and be aware of any potential race conditions or conflicts. Additionally, consider using a reverse proxy (e.g., Nginx) for load balancing and SSL termination in a production environment.