// Test import of a JavaScript function
import { example } from "./js/example";
import { getCard } from "./app/model/card";

// Test import of an asset
import webpackLogo from "./images/webpack-logo.svg";

// Test import of styles
import "./styles/index.scss";

// Appending to the DOM
const logo = document.createElement("img");
logo.src = webpackLogo;

const heading = document.createElement("h1");
heading.textContent = example();

const app = document.querySelector("#root");
app.append(logo, heading);

let displayedCards = [];
let cardId;
let currentCardContainer;
let currentCardRemover;
const cardsHolder = document.querySelector("#cards-holder");
const cardTrigger = document.querySelector("#card-trigger");

cardTrigger.addEventListener("click", (e) => {
  cardId = e.target.getAttribute("data-sku");
  if (
    displayedCards.length === 0 ||
    !displayedCards.some((card) => card.id.toString() === cardId.toString())
  ) {
    getCard(cardId).then((card) => {
      currentCardContainer = document.createElement("div");

      currentCardContainer.setAttribute("id", `card-${cardId}`);

      currentCardContainer.textContent = card.title + card.body + card.id;

      currentCardRemover = document.createElement("button");
      currentCardRemover.setAttribute("id", `button-${cardId}`);
      currentCardRemover.setAttribute("text", "Remove");

      currentCardRemover.addEventListener("click", (e) => {
        let localCardId = e.target
          .getAttribute("id")
          .substring("button-".length);
        let localCard = document.querySelector(`#card-${localCardId}`);
        localCard.parentNode.removeChild(localCard);
        displayedCards = displayedCards.filter(
          (card) => card.id.toString() !== localCardId.toString()
        );
      });

      currentCardContainer.append(currentCardRemover);
      cardsHolder.append(currentCardContainer);

      displayedCards.push(card);
    });
  }
});

cardTrigger.addEventListener("click", (e) => {});
