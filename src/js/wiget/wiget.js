import './wiget.css';

export default class Wiget {
  constructor() {
    // const body =  document.querySelector('body');
    const pageContainer = document.createElement('div');
    pageContainer.classList.add('page-container');
    this.pageContainer = pageContainer;
    document.body.appendChild(pageContainer);

    // Кнопка
    const wigetButton = document.createElement('button');
    wigetButton.classList.add('wiget-button');
    this.wigetButton = wigetButton;
    pageContainer.appendChild(wigetButton);
    wigetButton.textContent = 'Click to toggle popover';

    // console.log(wigetButton)
    return wigetButton;
  }
}
