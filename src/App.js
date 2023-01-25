import { useEffect, useState } from "react";
import "./App.css";
import randomImg from "./components/randomImg";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "", matched: false },
  { src: "", matched: false },
  { src: "", matched: false },
  { src: "", matched: false },
  { src: "", matched: false },
  { src: "", matched: false },
  // { src: "", matched: false },
  // { src: "", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {

    for (var i = 0; i<6; i++) {
      cardImages[i].src = "/img/final/" + randomImg()
      cardImages[i].matched = false
    }

    const shuffledCards = [...cardImages, ...cardImages] //spread syntax
      .sort(() => Math.random() - 0.5) // some cards get sorted and some not
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])


  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  };
  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1 className="title">Znajdź drugiego Fusska :)</h1>
      <button onClick={shuffleCards}>Nowa Gra</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Ruchy: {turns}</p>
    </div>
  );
}

export default App;
