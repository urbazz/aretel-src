import Swiper from "swiper";
import { SwiperOptions } from "swiper/types/swiper-options";

export class Reviews {
  slides:NodeListOf<Element>
  slideIndex: NodeListOf<Element>;
  constructor () {
    this.slides = document.querySelectorAll('.review__index');
    this.slideIndex = document.querySelectorAll('.review__index');

    const swiperParams: SwiperOptions = {
      slidesPerView: 'auto',
      spaceBetween: 32,
    };

    const reviewsSlider = new Swiper('.reviews-slider', swiperParams);

    for(let i = 0; i < this.slides.length; i++) {
      this.slideIndex[i].innerHTML = `<span>${i + 1}</span>/${this.slides.length}`
    }
  }
}
