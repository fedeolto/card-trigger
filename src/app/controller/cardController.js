import { CardEvents } from "../view/cardEvents";

export class CardController {
  init = () => {
    const cardEvents = new CardEvents();
    const cardTrigger = document.querySelector("#card-trigger");

    cardTrigger.addEventListener("click", (e) => {
      const cardId = e.target.getAttribute("data-sku");
      cardEvents.addCard(cardId);
    });
  };
}
