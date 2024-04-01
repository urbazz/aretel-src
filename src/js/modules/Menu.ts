export interface menuConfig {
  parentNode:Element
  bodyContent?: string;
  closable?:boolean;
  customMethods?: {};
  animationSpeed?:number;
  title?:string;
  headerContent?:string;
  className?:string;
  footerContent?: string;
}

export class Menu {
  parentNode:Element
  menu:Element;
  menuWrapper:Element;
  menuBody:Element;
  defaultOptions:menuConfig;
  animationSpeed:number;
  isOpen:boolean;

  constructor(options:menuConfig) {
    this.parentNode = options.parentNode!;
    this.isOpen = false;

    this.defaultOptions = {
      parentNode: options.parentNode,
      animationSpeed: 300,
      closable: true
    }
    Object.assign(this.defaultOptions, options);

    this.renderMenu = this.renderMenu.bind(this);
    this.listeners = this.listeners.bind(this);
    this.renderMenu();
    this.listeners();
  }

  open() {
    if(!this.isOpen) {
      this.menu.classList.add('active');
      document.body.classList.add('hide');
      this.isOpen = true;
    }
  }

  close() {
    if(this.isOpen) {
      this.menu.classList.remove('active');
      this.menu.classList.add('hide');
      setTimeout(() => {
        this.menu.classList.remove('hide');
        document.body.classList.remove('hide');
      }, this.defaultOptions.animationSpeed);
      this.isOpen = false;
    }
  }

  renderMenu() {
    this.menu = document.createElement('div');
    this.menu.classList.add('menu');
    if(this.defaultOptions.className) {
      this.menu.classList.add(this.defaultOptions.className);
    }
    this.menu.insertAdjacentHTML('beforeend', `
      <div class="menu__wrapper" ${this.defaultOptions.closable ? `data-close="true"` : ''}>
        <div class="menu__body">
          <div class="menu__header ${this.defaultOptions.className ? this.defaultOptions.className + '__header' : ''}">
            <h3 class="menu__title ${this.defaultOptions.className ? this.defaultOptions.className + '__title' : ''}">
            ${this.defaultOptions.title || ''}
            </h3>
            <div class="menu-control">
              ${this.defaultOptions.closable ? `<button class="close-menu-btn btn--close" data-close="true"></button>` : ''}
            </div>
          </div>
          <div class="menu__content ${this.defaultOptions.className ? this.defaultOptions.className + '__content' : ''}">
            ${this.defaultOptions.bodyContent || ''}
          </div>
          <div class="menu__footer ${this.defaultOptions.className ? this.defaultOptions.className + '__footer' : ''}">
            ${this.defaultOptions.footerContent || ''}
          </div>
        </div>
      </div>
    `)

    this.defaultOptions.parentNode.insertAdjacentElement('beforeend', this.menu);
  }

  listeners() {
    this.menu.addEventListener('click', (event) => {
      const dataset = (event.target as HTMLDivElement).dataset || (event.target as HTMLButtonElement).dataset;
      if(dataset.close) {
        // console.log(dataset);
        this.close();
      }
    })
  }
}
