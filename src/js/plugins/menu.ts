class Menu {
  trigger: any;
  menu: any;
  opened: boolean;
  animationSpeed: number;

  constructor({
    trigger,
    menuSelector
  }) {
    this.opened = false;
    this.animationSpeed = 500;
    this.trigger = document.querySelector(trigger);
    this.menu = document.querySelector(menuSelector);

    this.events();
  }

  openMenu() {
    console.log(this.animationSpeed);
    // this.menu.classList.add('acive');
    document.body.classList.add('hidden');
    this.opened = true;
    console.log('click');
  }

  closeMenu() {
    this.menu.classList.remove('acive');
      this.menu.classList.add('hide');
      setTimeout(() => {
        this.menu.classList.remove('hide');
        document.body.classList.remove('hidden');
        this.opened = false
      }, this.animationSpeed);
  }


  public get Menu() : string {
    return this.menu
  }

  events() {
    this.trigger.addEventListener('click', this.openMenu);
  }
}

export default Menu;
