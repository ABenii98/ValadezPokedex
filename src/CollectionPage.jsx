import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
import { API } from 'https://cdn.jsdelivr.net/npm/aws-amplify@6.0.5/+esm';
import './App.css';

const CollectionPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await API.get('PokemonTradingAPI', '/cards');
        setCards(response.cards);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

  return (
    <div className="card-container">
      <h1 className="page-title">Pokémon Card Collection</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-grid">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.cardId} className="card">
                <img src={card.imageUrl} alt={card.name} />
                <h2>{card.name}</h2>
                <p>Set: {card.set}</p>
                <p>Condition: {card.condition}</p>
                <p>Value: ${card.value}</p>
              </div>
            ))
          ) : (
            <p>No cards available in the collection.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;