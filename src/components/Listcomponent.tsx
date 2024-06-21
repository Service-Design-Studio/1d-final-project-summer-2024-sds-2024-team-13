import React, { useState } from 'react';
import TopCard from './TransactionCard';
import MidCard from './OldTransactionCard';



interface CardData {
    id: number;
    type: 'top' | 'mid';
    price: number;
  }
  
  const List: React.FC = () => {
    const [cards, setCards] = useState<CardData[]>([]);
    const [priceInput, setPriceInput] = useState<number>(0);
  
    const addTopCard = () => {
      const newCard: CardData = {
        id: Date.now(),
        type: 'top',
        price: priceInput,
      };
  
      // Move the current top card to mid card if exists
      const updatedCards = cards.map(card => ({
        ...card,
        type: card.type === 'top' ? 'mid' : card.type,
      }));
  
      setCards([newCard, ...updatedCards]);
      setPriceInput(0); // Reset price input after adding card
    };
  
    const addMidCard = () => {
      const newCard: CardData = {
        id: Date.now(),
        type: 'mid',
        price: priceInput,
      };
      setCards([newCard, ...cards]);
      setPriceInput(0); // Reset price input after adding card
    };
  
    const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      setPriceInput(isNaN(value) ? 0 : value); // Ensure input is a valid number
    };
  
    return (
      <div className="list-container">
        <div className="input-container">
          <input
            type="number"
            value={priceInput}
            onChange={handlePriceInputChange}
            placeholder="Enter price"
          />
          <button onClick={addTopCard}>Add Top Card</button>
        </div>
        {cards.map((card) => (
          card.type === 'top' ? <TopCard key={card.id} price={card.price} /> : <MidCard key={card.id} price={card.price} />
        ))}
      </div>
    );
  };
  
  export default List;