import React, { useState } from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
import { API } from 'https://cdn.jsdelivr.net/npm/aws-amplify@6.0.5/+esm';
import './App.css';

const ManagementPage = () => {
  const [cardForm, setCardForm] = useState({
    name: '',
    set: '',
    condition: '',
    value: '',
    image: null,
  });
  const [raffleForm, setRaffleForm] = useState({
    name: '',
    prizeCard: '',
    endDate: '',
    description: '',
  });

  const handleCardInputChange = (e) => {
    const { name, value, files } = e.target;
    setCardForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRaffleInputChange = (e) => {
    const { name, value } = e.target;
    setRaffleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(cardForm).forEach((key) => {
        formData.append(key, cardForm[key]);
      });
      await API.post('PokemonTradingAPI', '/cards', { body: formData });
      alert('Card added successfully!');
      setCardForm({ name: '', set: '', condition: '', value: '', image: null });
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Failed to add card.');
    }
  };

  const handleRaffleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('PokemonTradingAPI', '/raffles', { body: raffleForm });
      alert('Raffle created successfully!');
      setRaffleForm({ name: '', prizeCard: '', endDate: '', description: '' });
    } catch (error) {
      console.error('Error creating raffle:', error);
      alert('Failed to create raffle.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Add New Card</h2>
          <form onSubmit={handleCardSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="block text-gray-700">Card Name</label>
              <input
                type="text"
                name="name"
                value={cardForm.name}
                onChange={handleCardInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Set</label>
              <input
                type="text"
                name="set"
                value={cardForm.set}
                onChange={handleCardInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Condition</label>
              <input
                type="text"
                name="condition"
                value={cardForm.condition}
                onChange={handleCardInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Value ($)</label>
              <input
                type="number"
                name="value"
                value={cardForm.value}
                onChange={handleCardInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Image</label>
              <input
                type="file"
                name="image"
                onChange={handleCardInputChange}
                className="w-full"
                accept="image/*"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Card
            </button>
          </form>
        </div>
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create New Raffle</h2>
          <form onSubmit={handleRaffleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Raffle Name</label>
              <input
                type="text"
                name="name"
                value={raffleForm.name}
                onChange={handleRaffleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Prize Card</label>
              <input
                type="text"
                name="prizeCard"
                value={raffleForm.prizeCard}
                onChange={handleRaffleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={raffleForm.endDate}
                onChange={handleRaffleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={raffleForm.description}
                onChange={handleRaffleInputChange}
                className="w-full border rounded p-2"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Raffle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;