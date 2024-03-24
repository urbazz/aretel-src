class Modal {
  [x: string]: any;

  closable: boolean;
  title: string;
  content: string;
  footer: string;
  closing: boolean;
  deleted: boolean;
  animationSpeed: number;
  static classList: any;
  static parrentNode: any;

  constructor({
    closable,
    animationSpeed,
    title,
    content,
    footer,
  }) {

    this.closable = closable;
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.closing = true;

    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.insertAdjacentHTML('afterbegin',
      `<div class="modal-wrapper" data-close="true">
          <div class="modal-window">
              <div class="modal__header">
                  <h2 class="modal__title">${this.title}</h2>
                  ${this.closable ?`<button  class="modal__close-icon" data-close="true">&times;</button>`:''}
              </div>
              <div class="modal__content" data-content>
                  ${this.content || ''}
              </div>
              <div class="modal__content" data-content>
                  ${this.footer || ''}
              </div>
          </div>
        </div>`);
    document.body.appendChild(this.modal);

    this.listeners();
  }

  open() {
    this.closing, !this.deleted && this.modal.classList.add('active');
  }

  close() {
    if (this.closable) {
      this.modal.classList.remove('active');
      this.modal.classList.add('hide');
      setTimeout((): void => {
        this.modal.classList.remove('hide');
        this.closing;
      }, this.animationSpeed);
    }
  }

  listeners() {
      this.modal.addEventListener('click', event => {
        if(event.target.dataset.close) {
            this.close()
        }
      });

      window.addEventListener('keydown', event => {
        event.key === "Escape" && this.close();
      });
  }

  delete() {
    this.modal.parrentNode.removeChilde(Modal);
    this.deleted = true;
  }
}

export default Modal
