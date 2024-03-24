import Swiper from "swiper";
import { SwiperOptions } from "swiper/types/swiper-options";

export class Staff {
  slideIndexBlock: Element
  slides: NodeListOf<Element>
  constructor() {
    this.slideIndexBlock = document.querySelector('.staff__index')!;
    this.slides = document.querySelectorAll('.staff-slide');
    this.slideIndexBlock.innerHTML = `<span>1</span> / ${this.slides.length}`
    const swiperParams: SwiperOptions = {
      direction: 'horizontal',
      effect: 'fade',
      on: {
        realIndexChange: (swiper) => {
          this.slideIndexBlock.innerHTML = `<span>${swiper.realIndex+1}</span>/${this.slides.length}`
        }
      }
    };

    new Swiper('.staff__slider', swiperParams);
  }
}
