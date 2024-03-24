export class About {

  accordion:NodeListOf<HTMLDivElement>;
  controlBtnSelector:string;
  controlBtn:NodeListOf<HTMLButtonElement>;
  accordionBottom:NodeListOf<HTMLDivElement>;
  maxHeight:string;

  constructor() {
    this.accordion = document.querySelectorAll('.accordion');
    this.accordionBottom = document.querySelectorAll('.accordion__bottom');
    this.controlBtn = document.querySelectorAll('.accordion__control-btn')!;


    this.listeners = this.listeners.bind(this);

    this.listeners();
  }

  listeners() {
    for(let i = 0; i<this.accordion.length; i++) {
      this.accordionBottom[i].style.maxHeight = '0px';
      // this.accordionBottom[i].style.maxHeight;
      this.controlBtn[i].addEventListener('click', () => {
        this.accordion[i].classList.toggle('active');
        if(this.accordionBottom[i].style.maxHeight != '0px') {
          this.accordionBottom[i].style.maxHeight = '0px';
        } else {
          this.accordionBottom[i].style.maxHeight = `${this.accordionBottom[i].scrollHeight}px`;
        };
      })
    }
  }
}
