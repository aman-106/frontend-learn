class MyPromise {
  constructor(callback) {
    this.callback = callback;
    this.onThen = this.onThen.bind(this);
    this.onCatch = this.onCatch.bind(this);
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    this.catch = this.catch.bind(this);
    this.thenable = [];
    this.catchable = [];

    // init
    this.callback(this.resolve, this.reject);
  }

  resolve(x) {
    // x
    if(typeof x === 'function') x();

     console.log(x)

    this.onThen(x);
  }

  onThen(x) {
    let input  = x;
    while (this.thenable.length) {
      const fn = this.thenable.shift();
      try {
        input = fn(input);
      } catch (e) {
        this.onCatch(e);
      }
    }
  }

  onCatch(e) {
    let input = e;
    const fn = this.catchable.shift();
    try {
        input = fn(input);
    } catch (e) {
      this.onCatch(e);
    }
  }

  reject(x) {
    //
    if(typeof x === 'function') x();
    
    console.log(x);

    this.onCatch(x);
  }

  then(callback) {
    this.thenable.push(callback);
    return this;
  }

  catch(callback) {
    this.catchable.push(callback);
    return this;
  }
}

function fjfj(a) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (a) {
        debugger;
        resolve("dkdk")
      }
      else{
        debugger;
        reject("dkdk reject");
    }
        
    }, 1000);
  });
}

fjfj(1)
  .then(() => console.log("djffkfk"))
  .catch(() => console.log("catch"));


  const State = {
    pending:'pending',
    done:'done',
    error:'error',
  }


class MyPromise2{

    constructor(callback) {
        this.callback = callback;
        this.onThen = this.onThen.bind(this);
        this.onCatch = this.onCatch.bind(this);
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        this.then = this.then.bind(this);
        this.catch = this.catch.bind(this);
        this.thenable = [];
        this.catchable = [];
    
        // init
        this.val = null;
        this.state = State.pending;
        this.callback(this.resolve, this.reject);
      }


      resolve(x) {
        // x
        this.val = val;
        this.state = State.done;
         
    
        this.onThen(x);
      }


      reject(x) {
        //
        this.val = val;
        this.state = State.error;
 
        this.onCatch(x);
      }
    
      onThen(x) {
        let input  = x;
        while (this.thenable.length) {
          const fn = this.thenable.shift();
          try {
            input = fn(input);
          } catch (e) {
            this.onCatch(e);
          }
        }
      }
    
      onCatch(e) {
        let input = e;
        const fn = this.catchable.shift();
        try {
        input = fn(input);
        } catch (e) {
          this.onCatch(e);
        }
      }
    

    
      then(sCallable , eCallable) {
        // new MyPromise2()
        // this.thenable.push(callback);
        // return this;

        return new MyPromise2((resolve,reject)=>{

            const sucessCaller = ()=>{
                if(!sCallable) return resolve(this.val);
                try{
                    let val = sCallable(this.val)
                    resolve(val)
                }catch(e){
                    reject(e);
                }
            }

            const errorCaller = ()=>{
                if(!eCallable) return reject(this.val);
                try{
                    let val = eCallable(this.val)
                    resolve(val)
                }catch(e){
                    reject(e);
                }
            }

            switch(this.state){
                case State.pending:
                    this.thenable.push(sCallable)
                    this.catchable.push(eCallable)
                    break;
                case State.done:
                    sCallable();
                    break;
                case State.error:
                    eCallable(this.val);
                    break;
                default:
                    throw new Error('sk')
            }

        });
      }
    
      catch(callback) {
        // this.catchable.push(callback);
        // return this;
        return this.then(null,callback);
      }

}


