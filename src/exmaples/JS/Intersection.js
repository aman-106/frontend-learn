const images = document.querySelectorAll('.lazyload'); // 

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add('loaded')
      observer.unobserve(entry.target);
    }
  });
}

const observer = new MyIntersectionObserver(handleIntersection);

images.forEach(image => observer.observe(image));


class MyIntersectionObserver{


  constructor(handleIntersection){
    // loop over every entirs , then do actions is entry is isIntersecting or not
    this.handleIntersection = handleIntersection; 
    this.elems = [];
    
    // init
    this.addScrollListener();
  }

  addScrollListener = ()=> {
    window.addEventListener('scroll',this.handleScroll);
  }


  observe(elem){
    this.elems.push(elem)
    // elem
  }

  unobserve(elem){
    // remove 
  }

  handleScroll(){
    // list of elems
    this.elems = this.elems.map((elem)=>{
      // add proppertiers for  each elem -  postion etc 
      const scrollPosition  = window.scrollY;
      const bttomY = scrollPosition + window.innerHeight 
      return {
        ...elem,
        isIntersecting:bttomY > elem.top && bttomY < entry.bottom // bttomY lies in elem (top , bottom)
      }
    });

    this.handleIntersection(this.elems);

  }


}


