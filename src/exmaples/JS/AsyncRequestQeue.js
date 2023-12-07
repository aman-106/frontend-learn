// input 
// array of [
//     fetch(q1),
//     fetch(q2),
//     fetch(q3)
// ]

// result of {
//     q1 
//     q2 
//     q3 in given order 
// }


async function requestQueue(...request){
    const arra = []
    for (let index = 0; index < request.length; index++) {
        try {
        const res = await request[index];
        arra.push(res);
        } catch (error) {
            throw Error(error)
        }
    }
    return arra;
}

// How to serialize calls to an async function
// 

// use case 
// // Simulate an asynchronous function that accesses a shared resource
// async function accessSharedResource(id) {
//     console.log(`Accessing resource with ID: ${id}`);
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
//     console.log(`Resource with ID ${id} accessed.`);
//     return `Data for resource ${id}`;
//   }
  
//   // Wrap the function with serialize to ensure sequential execution
//   const serializedAccess = serialize(accessSharedResource);
// output -- will be similar 
//   // Multiple calls to serializedAccess will be executed one after the other
//   (async () => {
//     console.log(await serializedAccess(1));
//     console.log(await serializedAccess(2));
//     console.log(await serializedAccess(3));
//   })();


function serialize(fn){

    const qeue = Promise.resolve();

    return (...args)=>{

        const res = qeue.then(() => fn(...args));
        qeue.catch((e) => console.log(e));
        return res; // promise
    }

}
  

// serializedAccess(10)
// serializedAccess(2)
// async function dkdk(params) {
//   await serializedAccess(3)
// }
// dkdk()
  


// VM284:3 Accessing resource with ID: 10
// Promise {<pending>}
// VM284:5 Resource with ID 10 accessed.
// VM284:3 Accessing resource with ID: 2
// VM284:5 Resource with ID 2 accessed.
// VM284:3 Accessing resource with ID: 3
// VM284:5 Resource with ID 3 accessed.