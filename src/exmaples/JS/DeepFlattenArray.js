const { type } = require("@testing-library/user-event/dist/type");

[1,[2,3,5]]]

function flattenArray(array){
    if(!Array.isArray()){
        return array;
    }

    const y = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        y.push(...flattenArray(element));
    }

    return y;
}





// assuming keys to be unqiue
{
    e : {
        f : g :{
            a:1,
            b,2
        }
    }
}


function flattenObject(input) {
    const output = {};
  
    function _flattenObject(obj, currentKey = '') {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const newKey = currentKey ? `${currentKey}.${key}` : key;
          const value = obj[key];
  
          if (typeof value === 'object' && !Array.isArray(value)) {
            _flattenObject(value, newKey);
          } else {
            output[newKey] = value;
          }
        }
      }
    }
  
    _flattenObject(input);
    return output;
  }
  
  const inputObject = {
    e: {
      f: {
        g: {
          a: 1,
          b: 2,
        },
      },
    },
  };
  
  const flattened = flattenObject(inputObject);
  console.log(flattened);

// 

  function flatten(input) {
    const output = {};
  
    function recurse(current, property) {
      if (property) {
        if (Array.isArray(current)) {
          for (let i = 0; i < current.length; i++) {
            recurse(current[i], `${property}[${i}]`);
          }
        } else if (typeof current === 'object') {
          for (const key in current) {
            if (current.hasOwnProperty(key)) {
              recurse(current[key], property ? `${property}.${key}` : key);
            }
          }
        } else {
          output[property] = current;
        }
      } else if (Array.isArray(current) || typeof current === 'object') {
        for (const key in current) {
          if (current.hasOwnProperty(key)) {
            recurse(current[key], key);
          }
        }
      }
    }
  
    recurse(input, '');
    return output;
  }
  
  // Example usage:
  const input = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4],
      e: {
        f: 5,
      },
    },
    g: [6, 7],
  };
  
  const flattened = flatten(input);
  console.log(flattened);
  


   // Example usage:
   const input = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4],
      e: {
        f: 5,
      },
    },
    g: [6, 7],
  };



  // initial extra colon is added 
  function flattened(input){
    const output = {};

    function recurive(input,path){

            if(Array.isArray(input)){
                for (let index = 0; index < input.length; index++) {
                    const element = input[index];
                    const newpath = `${path}:[${index}]`;
                    recurive(element,newpath);
                }
            }else if(typeof input=== 'object' && input!== null){
                for (const key in input) {
                    if (Object.hasOwnProperty.call(input, key)) {
                        const element = input[key];
                    const newpath = `${path}:${key}`;
                    recurive(element,newpath);  
                    }
                }
            }else{
                output[path]  = input;
            }
    }

    recurive(input,'')

    return output
  }



  // other flatten 

  function flatten4(input){
    if(Array.isArray(input)){
        return flattenArray1(input)
    }else if(typeof input === "object" && input!== null){
        return flattenObject1(input)
    }else{
        return input;
    }
  }

  function flattenArray1(input){
    if(!Array.isArray(input) && typeof input != 'object' )

    let y = [];
    if(Array.isArray(input)){
        for (const iterator of input) {
            y.push(...flattenArray1(iterator))
        }
    }else if(typeof input === 'object' && input!== null){ // objjcet 
        y.push(flattenObject1(iterator))
    }else{
        y.push(iterator)
    }

    return y;


  } 


  function flattenObject1(input){
    let flatten = {};
    if(){ // object
        for (const key in input) {
            if (Object.hasOwnProperty.call(input, key)) {
                const element = input[key];

                const o = flatten4(element);
                 flatten = {...flatten , ...o};
            }
        }
    }else if(!Array.isArray(input) && typeof input != 'object'){
        return flatten ;
    }


  }
  

