const requestURL: string = './resources/db.json';
interface Project {
  Title ? : string,
    CurrentPrice ? : number,
    FullPrice ? : number,
    ID ? : string | number,
    Type ? : string
}

export class Hero {
  form: HTMLFormElement;
  formInputs: NodeListOf < HTMLInputElement > ;
  formCards: NodeListOf < HTMLLabelElement > ;
  formInput: HTMLInputElement;
  formInputId: string;
  formCard: HTMLLabelElement;
  sectionContainer: HTMLDivElement;
  sectionWrapper: HTMLDivElement;
  projectsSection: HTMLDivElement;
  projectsContainer: HTMLDivElement;
  projectsGrid: HTMLDivElement;
  seeMoreBtn: HTMLButtonElement;
  request: XMLHttpRequest;
  projects: object[];
  filteredProjects: object[];
  project: Project;
  projectCard: string;
  constructor() {
    this.form = document.querySelector('.hero-form') !;
    this.formInputs = document.querySelectorAll('.hero-form__input');
    this.formCards = document.querySelectorAll('.hero-form__card');
    this.sectionContainer = document.querySelector('.hero__container') !;
    this.sectionWrapper = document.querySelector('.hero__wrapper') !;

    this.listeners = this.listeners.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.getRequest = this.getRequest.bind(this);
    this.getInputId = this.getInputId.bind(this);
    this.createSeeMoreBtn = this.createSeeMoreBtn.bind(this);

    this.listeners();
  }

  listeners(): void {
    this.formCards.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.sectionContainer.setAttribute('style', `background-image: url('./img/hero-bg-${index+1}.svg');`);
      });
    });

    this.form.addEventListener('submit', () => {
      this.formSubmit(event);
      this.getInputId();
      console.log(this.formInputId);
      this.getRequest();
      this.request.addEventListener('load', () => {
        this.renderCards();
        this.projects = this.request.response.projects;
        this.filteredProjects = this.projects.filter((item: Project) => {
          return item.Type == this.formInputId
        });

        if (this.filteredProjects.length < 6) {
          for (let j = 0; j < this.filteredProjects.length; j++) {
            this.project = this.filteredProjects[j];
            this.projectCard = this.cardConfig(this.project.Title, this.project.CurrentPrice, this.project.FullPrice, this.project.ID)
            this.projectsGrid.insertAdjacentHTML('beforeend', this.projectCard);
          }
        } else {
          this.createSeeMoreBtn();
          for (let j = 0; j < 6; j++) {
            this.project = this.filteredProjects[j];
            this.projectCard = this.cardConfig(this.project.Title, this.project.CurrentPrice, this.project.FullPrice, this.project.ID)
            this.projectsGrid.insertAdjacentHTML('beforeend', this.projectCard);
          }
          this.seeMoreBtn.addEventListener('click', () => {
            this.seeMoreBtn.parentNode?.removeChild(this.seeMoreBtn);
            this.projectsGrid.innerHTML = '';
            for (let j = 0; j < this.filteredProjects.length; j++) {
              this.project = this.filteredProjects[j];
              this.projectCard = this.cardConfig(this.project.Title, this.project.CurrentPrice, this.project.FullPrice, this.project.ID)
              this.projectsGrid.insertAdjacentHTML('beforeend', this.projectCard);
            }
          })
        }
      });
    });
  }

  formSubmit(event): void {
    event.preventDefault();
    this.form.classList.add('hide');
  }


  getInputId(): string {
    this.formInput = this.form.querySelector('.hero-form__input:checked') !;
    this.formInputId = this.formInput.getAttribute('id') !;
    return this.formInputId;
  }

  cardConfig(title: string | undefined, currentPrice: string | number | undefined, fullPrice: string | number | undefined, id: string | number | undefined): string {
    return `
    <article class="projects__item project-card">
      <img src="./img/project-img.jpg" alt="Изображение:${title} width="408px" height="240px" loading="lazy" class="project-card__img">
      <h3 class="project-card__title">${title}</h3>
      <div class="project-card__footer">
        <div class="project-card__price">
          <span class="project-card__current-price">${currentPrice} ₽</span>
          <span class="project-card__full-price">${fullPrice} ₽ </span>
        </div>
        <button class="btn btn--accent project-card__btn" data-id=${id}>КУПИТЬ ПРОЕКТ</button>
      </div>
    </article>
    `
  }

  renderCards(): HTMLDivElement {
    this.projectsSection = document.createElement('div');
    this.projectsContainer = document.createElement('div');
    this.projectsGrid = document.createElement('div');

    this.projectsSection.classList.add('projects', 'hero__projects', 'section', 'section--light');
    this.projectsContainer.classList.add('container', 'projects__container');
    this.projectsGrid.classList.add('projects-grid');

    this.sectionWrapper.insertAdjacentElement('afterend', this.projectsSection);
    this.projectsSection.insertAdjacentElement('beforeend', this.projectsContainer);
    this.projectsContainer.insertAdjacentElement('beforeend', this.projectsGrid);

    return this.sectionContainer;
  }

  getRequest(): void {
    this.request = new XMLHttpRequest();
    this.request.open("GET", requestURL);
    this.request.responseType = "json";
    this.request.send();
  }

  createSeeMoreBtn():HTMLButtonElement {
    this.seeMoreBtn = document.createElement('button');
    this.seeMoreBtn.classList.add('btn','btn--reset','more-btn');
    this.seeMoreBtn.textContent = `еще ${this.filteredProjects.length - 6} ${this.filteredProjects.length - 6 > 4 &&'Проектов' || 'Проекта'}`;
    this.projectsContainer.appendChild(this.seeMoreBtn);
    return this.seeMoreBtn;
  }

}
