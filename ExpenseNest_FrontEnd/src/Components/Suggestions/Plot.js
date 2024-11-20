import React from 'react';
import './Plot.css'; // Import CSS for styling

function Plot({ category }) {
    return (
        <div className="plot-container">
            <h3>{category} Forecast</h3>
            <img
                className="forecast-plot"
                src={`http://127.0.0.1:5000/plot/${category}_forecast.png`}
                alt={`${category}Forecast`}
            />
        </div>
    );
}

export default Plot;