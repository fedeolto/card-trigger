import { DisplayedCards } from "../controller/displayedCards";
import { CardDao } from "../model/cardDao";
import {
  BUTTON_ID_PREFIX,
  CARD_ID_PREFIX,
  REMOVE_LABEL,
  CARDS_HOLDER_ID,
} from "../constants";

const displayedCards = new DisplayedCards();

export class CardEvents {
  removeCard = (cardIdParameter) => {
    let cardId =
      typeof cardIdParameter === "string" &&
      cardIdParameter.startsWith(BUTTON_ID_PREFIX)
        ? cardIdParameter.substring(BUTTON_ID_PREFIX.length)
        : cardIdParameter;

    let localCard = document.querySelector(`#${CARD_ID_PREFIX}${cardId}`);
    localCard.parentNode.removeChild(localCard);
    displayedCards.removeCardId(cardId);
  };

  addCard = (cardId) => {
    const cardDao = new CardDao();
    let currentCardContainer;
    let currentCardRemover;
    const cardsHolder = document.querySelector(`#${CARDS_HOLDER_ID}`);

    if (
      displayedCards.getLength() === 0 ||
      !displayedCards.isCardPresent(cardId)
    ) {
      cardDao.getCard(cardId).then((card) => {
        currentCardContainer = document.createElement("div");

        currentCardContainer.setAttribute("id", `${CARD_ID_PREFIX}${cardId}`);

        currentCardContainer.textContent = card.title + card.body + card.id;

        currentCardRemover = document.createElement("button");
        currentCardRemover.setAttribute("id", `${BUTTON_ID_PREFIX}${cardId}`);
        currentCardRemover.setAttribute("text", REMOVE_LABEL);

        currentCardRemover.addEventListener("click", (e) => {
          const buttonCardId = e.target.getAttribute("id");
          this.removeCard(buttonCardId);
        });

        currentCardContainer.append(currentCardRemover);
        cardsHolder.append(currentCardContainer);

        displayedCards.addCard(card);
      });
    }
  };

  removeAllCards = () => {
    const allCardIds = displayedCards.getCardIds();
    allCardIds.forEach((cardId) => this.removeCard(cardId));
  };
}
