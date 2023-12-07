rateLimiter class 
isAllow method 
every request has unique  client id 

block request if client has more than 100 request past  sec

// decator class for request 

count 
timestamp - 1 sec > 100 

data = {
    timestamp,cline
    timestamp2,
}

new timstamp , if ( timstamp - 1 sec )

class RateLimiter  {
    constructor(cleintID){
        this.clients = new Set();
        this.bucket = 100;
        this.reset = this.reset.bind();
    }


    isAllow(){
        --this.bucket;
       return  this.bucket > 0 
    }

    reset(){
        setInterval(()=>{
            this.bucket = 100;
        },1000
            
        );
    }
}


class RateLimiter {
    constructor(limit, interval) {
      this.limit = limit; // Maximum requests allowed in the interval
      this.interval = interval * 1000; // Interval in milliseconds
      this.clients = new Map(); // To keep track of client requests
    }
  
    isAllow(clientId) {
      const currentTime = Date.now();
      const clientRequests = this.clients.get(clientId) || [];
  
      // Remove expired timestamps from the beginning of the array
      while (clientRequests.length > 0 && currentTime - clientRequests[0] > this.interval) {
        clientRequests.shift();
      }
  
      if (clientRequests.length < this.limit) {
        clientRequests.push(currentTime);
        this.clients.set(clientId, clientRequests);
        return true;
      }
  
      return false;
    }
  }
  
  // Usage:
  const rateLimiter = new RateLimiter(100, 1); // 100 requests per second
  
  // Simulate requests
  const clientId = "client123";
  for (let i = 0; i < 110; i++) {
    if (rateLimiter.isAllow(clientId)) {
      console.log(`Request ${i + 1} allowed`);
    } else {
      console.log(`Request ${i + 1} blocked`);
    }
  }
  

