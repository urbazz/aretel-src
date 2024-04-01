interface mapOption {
  once: boolean,
  passive: boolean,
  capture: boolean
}

export default function yandexMapLoading() {

  const mapContainer:Element = document.querySelector('.map')!;
  const mapBlock:Element = document.querySelector('#map-block')!;
  const mapOptions:mapOption = {
    once: true,
    passive: true,
    capture: true
  }

  function startMapLoading():void {
    let mapIsLoaded:boolean = false;

    if(!mapIsLoaded) {
      mapIsLoaded =  true;
      mapBlock?.setAttribute('src', mapBlock.getAttribute('data-src')!);
      mapBlock?.removeAttribute('data-src');
      console.log('YMAP LOADED');
    }
  }

  mapContainer.addEventListener('click', startMapLoading, mapOptions)
  mapContainer.addEventListener('mouseover', startMapLoading, mapOptions)
  mapContainer.addEventListener('touchstart', startMapLoading, mapOptions)
  mapContainer.addEventListener('touchmove', startMapLoading, mapOptions)
}
