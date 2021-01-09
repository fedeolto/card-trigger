import { CardEvents } from "../view/cardEvents";
import { cardIdAttributeName } from "../constants";

export class CardController {
  init = () => {
    const cardEvents = new CardEvents();
    const cardTrigger = document.querySelector("#card-trigger");
    const cardRemover = document.querySelector("#remover");

    cardTrigger.addEventListener("click", (e) => {
      const cardId = e.target.getAttribute(cardIdAttributeName);
      cardEvents.addCard(cardId);
    });

    cardRemover.addEventListener("click", (e) => {
      cardEvents.removeAllCards();
    });
  };
}
