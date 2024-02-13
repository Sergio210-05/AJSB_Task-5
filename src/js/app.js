import Wiget from "./wiget/wiget";
import Tooltip from "./tooltip/tooltip";

document.addEventListener("DOMContentLoaded", () => {
  const newWiget = new Wiget();

  const newTooltip = new Tooltip();
  let activePopovers = [];

  newWiget.addEventListener('click', (el) => {
    const holderButton = el.target.closest('.wiget-button');
    if (activePopovers.length > 0) {
      let currentPopover = activePopovers.find((e) => e.holderButton.isEqualNode(holderButton));
      activePopovers = activePopovers.filter((e) => e.id != currentPopover.id)
      newTooltip.removeTooltip(currentPopover.id);
    } else {
      let id = newTooltip.showTooltip(el.target, 'Подсказка', 'Чтобы скрыть подсказку нажмите кнопку ещё раз');
      activePopovers.push({id, holderButton});
    }
  }) 
});
