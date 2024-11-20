from flask import Flask, jsonify, send_from_directory
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
if __name__ == '__main__':
    app.run(debug=True, port=6000) 
# Set up directories
STATIC_FOLDER = "static"
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Process the dataset on startup
data_file = "./smart_budgeting_dataset (1).csv"
cost_cutting_suggestions = []
plots = []

def process_data():
    global cost_cutting_suggestions, plots
    df = pd.read_csv(data_file)
    df['Date'] = pd.to_datetime(df['Date'])

    # Aggregate monthly expenses
    df['Month'] = df['Date'].dt.to_period('M')
    monthly_expenses = df.groupby(['Month', 'Category'])['Amount'].sum().unstack()
    monthly_expenses.fillna(0, inplace=True)

    # Calculate historical averages
    historical_averages = monthly_expenses.mean()

    forecast_steps = 3
    cost_cutting_suggestions = []

    for category in monthly_expenses.columns:
        model = ExponentialSmoothing(
            monthly_expenses[category],
            trend='add',
            seasonal=None
        ).fit()

        # Forecast the next 3 months
        forecast = model.forecast(forecast_steps)

        # Analyze overspending
        avg_forecast = forecast.mean()
        historical_avg = historical_averages[category]

        if avg_forecast > historical_avg:
            overspend = avg_forecast - historical_avg
            potential_savings = overspend * 0.10
            cost_cutting_suggestions.append({
                "Category": category,
                "Historical Average": historical_avg,
                "Forecasted Average": avg_forecast,
                "Overspend": overspend,
                "Potential Savings": potential_savings,
                "Suggestion": f"Reduce spending in '{category}' by 10% to save ${potential_savings:.2f}."
            })

        # Save the forecast plot
        plt.figure(figsize=(10, 6))
        monthly_expenses[category].plot(label='Actual', color='blue', marker='o')
        forecast.plot(label='Forecast', linestyle='--', color='red', marker='x')
        plt.axhline(historical_avg, color='green', linestyle='--', label='Historical Average')
        plt.title(f"Category: {category} - Actual vs Forecast")
        plt.xlabel("Month")
        plt.ylabel("Expense Amount")
        plt.legend()
        plt.grid(True)
        plot_path = os.path.join(STATIC_FOLDER, f"{category}_forecast.png")
        plt.savefig(plot_path)
        plt.close()

        # Keep track of plots
        plots.append(f"{category}_forecast.png")

process_data()

@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    """Serve cost-cutting suggestions."""
    return jsonify(cost_cutting_suggestions)

@app.route('/plot/<filename>')
def serve_plot(filename):
    """Serve a forecast plot."""
    return send_from_directory(STATIC_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
