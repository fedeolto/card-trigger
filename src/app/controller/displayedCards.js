let displayedCards;

export class DisplayedCards {
  constructor() {
    displayedCards = [];
  }

  removeCardId = (cardId) => {
    displayedCards = displayedCards.filter(
      (card) => card.id.toString() !== cardId.toString()
    );
  };

  getLength = () => {
    return displayedCards.length;
  };

  isCardPresent = (cardId) => {
    return displayedCards.some(
      (card) => card.id.toString() === cardId.toString()
    );
  };

  addCard = (card) => {
    displayedCards.push(card);
  };

  getCardIds = () => {
    return displayedCards.map((card) => card.id);
  };
}
