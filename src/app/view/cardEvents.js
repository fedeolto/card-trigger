import { DisplayedCards } from "../controller/displayedCards";
import { CardDao } from "../model/cardDao";

const displayedCards = new DisplayedCards();

export class CardEvents {
  removeCard = (cardIdParameter) => {
    let cardId =
      typeof cardIdParameter === "string" &&
      cardIdParameter.startsWith("button-")
        ? cardIdParameter.substring("button-".length)
        : cardIdParameter;
    let localCard = document.querySelector(`#card-${cardId}`);
    localCard.parentNode.removeChild(localCard);
    displayedCards.removeCardId(cardId);
  };

  addCard = (cardId) => {
    const cardDao = new CardDao();
    let currentCardContainer;
    let currentCardRemover;
    const cardsHolder = document.querySelector("#cards-holder");

    if (
      displayedCards.getLength() === 0 ||
      !displayedCards.isCardPresent(cardId)
    ) {
      cardDao.getCard(cardId).then((card) => {
        currentCardContainer = document.createElement("div");

        currentCardContainer.setAttribute("id", `card-${cardId}`);

        currentCardContainer.textContent = card.title + card.body + card.id;

        currentCardRemover = document.createElement("button");
        currentCardRemover.setAttribute("id", `button-${cardId}`);
        currentCardRemover.setAttribute("text", "Remove");

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
