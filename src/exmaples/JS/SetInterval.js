// create custom interval - for linear 

 mySetInterval(a,b)

//  interval = a + b * count

function mySetInterval(fn,a,b){
    let iteration = 0;
    let clearId ;
    
    function _mySetInterval(){
    
        clearId = setTimeout(() => {
            fn();
            _mySetInterval();
        },a+b*iteration);
        
        iteration++;
    
    }
    return clearId;
}



// clearTimeout = startTimeout - a + b * 0
// clearTimeout = startTimeout2 - a + b * 1