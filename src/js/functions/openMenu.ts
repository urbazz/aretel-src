export default function openMenu(
  buttonSelector:string,
  menuBlockSelector:string
):void {
  const callMenuBtn = document.querySelector(buttonSelector);
  const menu = document.querySelector<HTMLDivElement>(menuBlockSelector)!;
  let closed:boolean = true;
  const animationSpeed:number = 500

  function openMenu() {
    if(!closed) {
      return
    } else {
      menu.classList.add('active');
      closed = false;
    }
  }

  function closeMenu(event) {
    if (closed) {
      return
    } else {
      if (event.target.dataset.close) {
        menu.classList.remove('active');
        menu.classList.add('hide');
        closed = true;
        setTimeout(() => {
          menu.classList.remove('hide');
        }, animationSpeed);
      }
    }
  }

  callMenuBtn?.addEventListener('click', openMenu);
  menu.addEventListener('click', closeMenu)
}
