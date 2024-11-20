import React, { useState, useEffect } from 'react';
import Graph from './Graph';
import Form from './Form';
import List from './List';
import SideBar from '../Sidebar'; // Import the Sidebar component
import './debt.css';

const DebtTracker = () => {
  const [debts, setDebts] = useState([]);
  const [selectedDebt, setSelectedDebt] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/debts')
      .then(response => response.json())
      .then(data => setDebts(data || []))
      .catch(error => console.error('Error fetching debts:', error));
  }, []);

  const handleDebtAdded = (newDebt) => {
    setDebts(prevDebts => [...prevDebts, newDebt]);
  };

  const handleDebtUpdated = (updatedDebt) => {
    setDebts(prevDebts => prevDebts.map(debt => debt.id === updatedDebt.id ? updatedDebt : debt));
    setSelectedDebt(null); // Clear the selected debt after updating
  };

  const handleDeleteDebt = (id) => {
    fetch(`http://localhost:8080/api/debts/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setDebts(prevDebts => prevDebts.filter(debt => debt.id !== id));
    })
    .catch(error => console.error('Error deleting debt:', error));
  };

  const handleEditDebt = (debt) => {
    setSelectedDebt(debt);
  };

  return (
    <div className="App flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-9 mb-1 rounded text-black">Debt Tracker</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <Graph debts={debts} />
          <Form 
            onDebtAdded={handleDebtAdded} 
            onDebtUpdated={handleDebtUpdated} 
            selectedDebt={selectedDebt} 
            setSelectedDebt={setSelectedDebt} 
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* Labels section placeholder */}
          <div>
            {/* You can add a Labels component or any other content here */}
          </div>
          <div className="ml-4">
            <List debts={debts} onEdit={handleEditDebt} onDelete={handleDeleteDebt} />
          </div>
        </div>
        {selectedDebt && (
          <Form 
            onDebtAdded={handleDebtAdded} 
            onDebtUpdated={handleDebtUpdated} 
            selectedDebt={selectedDebt} 
            setSelectedDebt={setSelectedDebt} 
            isEditForm={true}
          />
        )}
      </div>
    </div>
  );
};

export default DebtTracker;
