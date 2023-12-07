function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  
  // Example usage:
  const debouncedFunction = debounce(() => {
    console.log('Debounced function executed');
  }, 1000);
  
  // Call debouncedFunction after user input or some event
  debouncedFunction();


  function throttle(func, delay) {
    let lastExecution = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastExecution >= delay) {
        func.apply(this, args);
        lastExecution = now;
      }
    };
  }
  
  // Example usage:
  const throttledFunction = throttle(() => {
    console.log('Throttled function executed');
  }, 1000);
  
  // Call throttledFunction repeatedly, but it will execute at most once every 1000ms
  setInterval(throttledFunction, 200);
  
  