import React, { useState, useEffect } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
import { API } from 'https://cdn.jsdelivr.net/npm/aws-amplify@6.0.5/+esm';
import './App.css';

const RafflesPage = () => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await API.get('PokemonTradingAPI', '/raffles');
        setRaffles(response.raffles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching raffles:', error);
        setLoading(false);
      }
    };
    fetchRaffles();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Active Raffles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {raffles.length > 0 ? (
            raffles.map((raffle) => (
              <div
                key={raffle.raffleId}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold">{raffle.name}</h2>
                <p className="text-gray-600">Prize: {raffle.prizeCard}</p>
                <p className="text-gray-600">End Date: {new Date(raffle.endDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Description: {raffle.description}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => alert(`Join raffle: ${raffle.name}`)}
                >
                  Join Raffle
                </button>
              </div>
            ))
          ) : (
            <p>No active raffles at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RafflesPage;