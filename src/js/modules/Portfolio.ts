import Swiper from "swiper";
import { SwiperOptions } from "swiper/types/swiper-options";

export class Portfolio {
  slideIndex: Number;
  slides: NodeListOf<HTMLDivElement>;
  slideIndexBlock: Element;

  constructor() {
    this.slideIndex = 1;
    this.slideIndexBlock = document.querySelector('.portfolio__index')!;
    this.slides = document.querySelectorAll('.portfolio-slide');

    this.slideIndexBlock.innerHTML = `<span>1</span>/${this.slides.length}`
    const swiperParams: SwiperOptions = {
      slidesPerView: 'auto',
      spaceBetween: 32,
      loop: true,
      on: {
        realIndexChange: (swiper) => {
          this.slideIndexBlock.innerHTML = `<span>${swiper.realIndex+1}</span>/${this.slides.length}`
        }
      }
    };

    const portfolioSlider = new Swiper('.portfolio__slider', swiperParams)
  }
}
