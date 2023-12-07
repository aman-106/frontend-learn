class MyIntersectionObserver {
  constructor(handleIntersection) {
    // loop over every entirs , then do actions is entry is isIntersecting or not
    this.handleIntersection = handleIntersection;
    this.elems = [];
    // bind
    this.addScrollListener = this.addScrollListener.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    // init
    this.addScrollListener();
  }

  addScrollListener() {
    window.addEventListener("scroll", this.handleScroll);
  }

  observe(elem) {
    this.elems.push(elem);
    // onload trigger
    this.handleScroll();
    // elem
  }

  unobserve(elem) {
    // remove
  }

  handleScroll() {
    // debugger;
    // list of elems
    this.elems.forEach((elem, index) => {
      // add proppertiers for  each elem -  postion etc
      const scrollPosition = window.scrollY;
      const bttomY = scrollPosition + window.innerHeight;
      const elemPsotion = elem.getBoundingClientRect();
      // elem top above bttom of page and elem bttom is below scrolled position

      const isIntersecting =
        bttomY > elemPsotion.top && scrollPosition < elemPsotion.bottom; 
      // console.log("isIntersecting", isIntersecting, index,elemPsotion.top);
      elem["isIntersecting"] = isIntersecting;
    });


    this.handleIntersection(this.elems);
  }
}

const images = document.querySelectorAll(".lazyload"); //

function handleIntersection(entries) {
  entries.map((entry) => {
    // debugger;
    if (entry.isIntersecting) {
      entry.src = entry.dataset.src;
      entry.classList.add("loaded");
      observer.unobserve(entry);
    }
  });
}

const observer = new MyIntersectionObserver(handleIntersection);

images.forEach((image) => observer.observe(image));



https://codesandbox.io/s/sweet-banach-7z5m24?file=/src/abc.js




