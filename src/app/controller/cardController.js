import { CardEvents } from "../view/cardEvents";

export class CardController {
  init = () => {
    const cardEvents = new CardEvents();
    const cardTrigger = document.querySelector("#card-trigger");
    const cardRemover = document.querySelector("#remover");

    cardTrigger.addEventListener("click", (e) => {
      const cardId = e.target.getAttribute("data-sku");
      cardEvents.addCard(cardId);
    });

    cardRemover.addEventListener("click", (e) => {
      cardEvents.removeAllCards();
    });
  };
}
