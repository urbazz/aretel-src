export default function Modal (options) {

    Element.prototype.appendAfter = function(element) {
        element.parentNode.insertBefore(this, element.nextSibling);
    }

    function noop () {}
    function _createModalFooter(buttons = []) {
        if (buttons.length === 0) {
            return document.createElement('div');
        }

        const wrap = document.createElement('div');
        wrap.classList.add('modal__footer')

        buttons.forEach(btn => {
            const $btn = document.createElement('button');
            $btn.textContent = btn.text;
            $btn.classList.add('modal__footer-btn');

            $btn.onclick = btn.handler || noop;

            wrap.appendChild($btn);
        })

        return wrap
    }

    function _createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        modal.insertAdjacentHTML('afterbegin', `
        
        <div class="modal-wrapper" data-close="true">

                <div class="modal-window">

                    <div class="modal__header">

                        <h2 class="modal__header-title">${options.title || 'Окно'}</h2>
                        ${options.closable ?`<button  class="modal__close-icon" data-close="true">&times;</button>`:''}

                    </div>

                    <div class="modal__content" data-content>

                        ${options.content || ''}

                    </div>

                </div>

            </div>

        `);

        const footer = _createModalFooter(options.footerButtons);
        footer.appendAfter(modal.querySelector('[data-content]'));
        document.body.appendChild(modal);
        return modal
    }

    const modal = {
        open() {
            if (destroyed) {console.log('Окно было удалено')}
            !modalClosing && $modal.classList.add('active');
            
        },
        close() {
            modalClosing = true;
            $modal.classList.remove('active');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                modalClosing = false;
            }, ANIMATION_SPEED);

        },
    }

    const $modal = _createModal(options);
    const ANIMATION_SPEED = 200
    let modalClosing = false;
    let destroyed = false;

    const listener = (event)=> {
        if(event.target.dataset.close){
            modal.close()
        }
    }

    window.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            // console.log(event.code)
            modal.close()
        }
    })

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })

    
}