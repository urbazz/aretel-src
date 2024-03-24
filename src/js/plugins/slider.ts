class Slider {
  slider:any;
  type:string;
  margin:number;
  currentSlide:number
  wrapper:Element;
  slides:any;
  width:number;
  slidesList:any;
  size:number;
  clickX:number;
  clickY:number;
  dragX:number;
  gragY:number;
  x:number;
  stratX:number;
  animationSpeed:number;
  currentSlideWasChange:boolean;
  maximumX: number;
  loop:boolean;
  constructor(sliderSelector:string, options) {
    this.slider = document.querySelector(sliderSelector);
    this.type = options.type || 'horisontal';
    this.margin = options.margin || 0;
    this.currentSlide = 0;
    this.wrapper = this.slider.querySelector('.slider-wrapper');
    this.size = this.wrapper.childElementCount;
    this.currentSlideWasChange = false;
    this.animationSpeed = options.animationSpeed || 300;
    this.loop = false || options.loop;

    this.manageHTML = this.manageHTML.bind(this);
    this.setParamerts = this.setParamerts.bind(this);
    this.resizeSlider = this.resizeSlider.bind(this);
    this.events = this.events.bind(this);
    this.destroyEvents = this.destroyEvents.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.draging = this.draging.bind(this);
    this.setStylePosition = this.setStylePosition.bind(this);
    this.manageHTML();
    this.setParamerts();
    this.events();

  }


  manageHTML() {
    this.slider.classList.add(`slider--${this.type || 'horisontal'}`)
    if(this.type == 'horisontal') {
      document.body.classList.add('hidden-x');
    }
    // console.log(this.wrapper);
    this.wrapper.innerHTML = `
    <div class="slider__track slider-track">
      ${this.wrapper.innerHTML}
    </div>`
    this.slidesList = this.wrapper.querySelector('.slider-track');

    this.slides = Array.from(this.slidesList.children);
  }

  setParamerts() {
    const coordsContainer = this.wrapper.getBoundingClientRect();
    this.width = coordsContainer.width;
    this.slidesList.style.width = `${this.size*(this.width + this.margin/2)}px`;
    this.x = this.currentSlide*(this.width + this.margin);
    this.maximumX = -(this.size-1) * this.width;

    this.slidesList.style.gap = `${this.margin}px`;
    this.slides.forEach(element => {
      element.style.width = `${this.width}px`
    });
  }

  resizeSlider()  {
    this.setParamerts();
  }

  events() {
    window.addEventListener('resize', debounce(this.resizeSlider));
    this.slidesList.addEventListener('pointerdown', this.startDrag);
    this.slidesList.addEventListener('pointerup', this.stopDrag);
  }

  destroyEvents() {
    window.removeEventListener('resize', debounce(this.resizeSlider));
    this.slidesList.removeEventListener('pointerdown', this.startDrag);
    this.slidesList.removeEventListener('pointerup', this.stopDrag);
  }

  startDrag(evt) {
    window.addEventListener('pointermove', this.draging);
    this.currentSlideWasChange = false;
    this.clickX = evt.pageX;
    this.stratX = this.x;
    this.resetStyleTransition();
  }

  stopDrag() {
    window.removeEventListener('pointermove', this.draging);
    this.x = -this.currentSlide * (this.width + this.margin/2);
    this.setStylePosition();
    this.setStyleTransition();
  }

  draging(evt) {
    this.dragX = evt.pageX;
    const dragShift = this.dragX - this.clickX;
    let easing;
    if (this.loop) {
      easing = dragShift/1;
      this.x = this.stratX+dragShift;
    } else {
      easing = dragShift/5;
      this.x = Math.max(Math.min(this.stratX+dragShift, easing), this.maximumX + easing);
    }

    this.setStylePosition();

    //Test
    console.log(this.currentSlide);


    if(
      dragShift > 20 &&
      dragShift > 0 &&
      !this.currentSlideWasChange &&
      this.currentSlide > 0

      ) {
        this.currentSlideWasChange = true;
        this.currentSlide = this.currentSlide - 1;
      }
      if(
        dragShift < -20 &&
        dragShift < 0 &&
        !this.currentSlideWasChange &&
        this.currentSlide <this.size - 1
        ) {
          this.currentSlideWasChange = true;
          this.currentSlide = this.currentSlide + 1;
        }
  }

  setStylePosition() {
    this.slidesList.style.transform = `translate3d(${this.x}px, 0, 0)`;
  }

  setStyleTransition() {
    this.slidesList.style.transition = `transform ${this.animationSpeed/1000}s ease-in`;
  }


  resetStyleTransition() {
    this.slidesList.style.transition = ``;
  }
}

//Helpers
function debounce(funct, time = 100) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(funct, time);
  }
}


export default Slider;

// import Slider from "./plugins/slider";

// new Slider('.slider', {
//   type: 'horisontal',
//   animationSpeed: 100,
//   margin: 10,
//   loop: true
// });
