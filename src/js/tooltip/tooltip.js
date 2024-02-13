import './tooltip.css';

export default class Tooltip {
  constructor() {
      this._tooltips = [];
  }

  showTooltip(element, title, message) {
      const tooltipElement = document.createElement('div');
      tooltipElement.classList.add('popover');

      const popoverTitle = document.createElement('h3');
      popoverTitle.classList.add('popover-title');
      tooltipElement.appendChild(popoverTitle);

      const popoverBody = document.createElement('div');
      popoverBody.classList.add('popover-body');
      tooltipElement.appendChild(popoverBody);

      popoverTitle.innerHTML = title;
      popoverBody.innerHTML = message;

      const id = performance.now();

      this._tooltips.push({
          id,
          element: tooltipElement
      })

      document.body.appendChild(tooltipElement);
      const {width, height } = tooltipElement.getBoundingClientRect();
      const { left: elementLeft, width: elementWidth, top: elementTop } = element.getBoundingClientRect();

      tooltipElement.style.top = elementTop - height - 5 + "px";
      tooltipElement.style.left = elementLeft + elementWidth / 2 - width / 2 + "px";

      return id;
  }

  removeTooltip(id) {
      const tooltip = this._tooltips.find(t => t.id === id);
      tooltip.element.remove();
      this._tooltips = this._tooltips.filter(t => t.id !== id);
  }
}
