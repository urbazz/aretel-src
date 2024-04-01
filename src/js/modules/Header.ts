import { Menu } from "./Menu";
import { menuConfig } from "./Menu";

export class Header {
  burgerBtn:HTMLButtonElement;
  navMenu:Menu;
  navMenuConfig:menuConfig;
  menuIsActive: boolean;

  constructor() {
    this.burgerBtn = document.querySelector('.burger')!;
    this.navMenuConfig = {
      parentNode: document.querySelector('.header')!,
      animationSpeed: 300,
      className: 'nav-menu',
      title: '<a href="tel:+79129999999">+7 (912) 999-99-99</a>'
    }

    this.navMenu = new Menu(this.navMenuConfig);
    // this.navMenu.open();

    this.listeners = this.listeners.bind(this);
    this.listeners();
  }

  listeners() {
    this.burgerBtn.addEventListener('click', () => this.navMenu.open())
  }

  openMenu() {

  }

  closeMenu() {

  }
}
