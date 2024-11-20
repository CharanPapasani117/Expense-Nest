import React from 'react';
import Suggestions from './Suggestions';
import Plot from './Plot';
import './main.css'; // Import CSS for styling
import Sidebar from '../Sidebar';

function Main() {
    const categories = ['Dining', 'Entertainment', 'Groceries', 'Miscellaneous', 'Transportation', 'Utilities'];

    return (
        <div className="main-container">
            <Sidebar />
            <h1>Expense Tracker</h1>
            <Suggestions />
            <div className="plot-grid">
                {categories.map((category) => (
                    <Plot key={category} category={category} />
                ))}
            </div>
        </div>
    );
}

export default Main;