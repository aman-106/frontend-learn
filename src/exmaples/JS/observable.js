// import { Observable } from 'rxjs';

// implement Observable

// class Observable{
 
//     constructor(subject){
//         this.subject= subject; // function
//         this.subscribes  = new Set();
//     }

//     notify(){
//         for(const x of this.subscribes){
//             this.subject(x);
//         }
//     }

//     subscribe(s){
//             this.subscribes.add(s);
//     }

//     unSubscribe(s){
//         this.subscribes.delete(s);
//     }

//     notifySubsciber(){
//       for(const x  of  this.subscribes){
//         x.next();
//       }
//     }

//     notifyErrorSubsciber(){
//         for(const x  of  this.subscribes){
//           x.error();
//         }
//     }

//     notiffDoneSubsciber(){
//         for(const x  of  this.subscribes){
//           x.done();
//         }
//     }


// }



const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');


// Exmpale of Observable pattern and decorator pattern  for creating of subscription wrapper
class Observable{
    constructor(setup){
        this.setup = setup; 
        // func
        // (s) => {
        //     next: (x) => {},
        //     error: (x) => {},
        //     complete: (x) => {}
        // }
    }


    subscribe(s){
       function wrapper() {
        const subscribe = true;
        return {
            next(x){
                subscribe && s.next(x);
            },
            error(x){
                subscribe && s.error(x)
            },
            complete(){
                subscribe && s.complete()
            },
            setsubscribe(x){
                subscribe= x;
            }
        }
       }
       return this.setup(new wrapper())
    }

}


