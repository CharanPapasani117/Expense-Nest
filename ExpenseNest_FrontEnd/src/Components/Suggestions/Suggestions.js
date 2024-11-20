import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Suggestions.css'; // Import CSS file for styling

function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function fetchSuggestions() {
            try {
                const response = await axios.get('http://127.0.0.1:6000/suggestions');
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
        fetchSuggestions();
    }, []);

    return (
        <div className="suggestions-container">
            <h2>Cost-Cutting Suggestions</h2>
            <table className="suggestions-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Historical Average</th>
                        <th>Forecasted Average</th>
                        <th>Overspend</th>
                        <th>Potential Savings</th>
                        <th>Suggestion</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestions.map((s, index) => (
                        <tr key={index}>
                            <td>{s.Category}</td>
                            <td>{s["Historical Average"].toFixed(2)}</td>
                            <td>{s["Forecasted Average"].toFixed(2)}</td>
                            <td>{s.Overspend.toFixed(2)}</td>
                            <td>{s["Potential Savings"].toFixed(2)}</td>
                            <td>{s.Suggestion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Suggestions;