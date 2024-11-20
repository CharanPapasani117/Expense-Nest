from flask import Flask, jsonify, send_from_directory, request
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import os
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set up directories
STATIC_FOLDER = "static"
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Load the trained model and scaler
try:
    model = joblib.load("overspending_model_gbm.pkl")
    scaler = joblib.load("scaler.pkl")
except FileNotFoundError as e:
    print(f"Error loading model or scaler: {e}")
    exit(1)

# Initialize global variables for suggestions and plots
cost_cutting_suggestions = []
plots = []

def process_data():
    """Process the dataset and generate cost-cutting suggestions and plots."""
    global cost_cutting_suggestions, plots
    data_file = "./smart_budgeting_dataset (1).csv"
    
    try:
        df = pd.read_csv(data_file)
    except Exception as e:
        print(f"Error reading data file: {e}")
        return

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
        model = ExponentialSmoothing(monthly_expenses[category], trend='add', seasonal=None).fit()

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

# Call the data processing function at startup
process_data()

@app.route('/suggestions', methods=['GET'])
def get_suggestions():
    """Serve cost-cutting suggestions."""
    return jsonify(cost_cutting_suggestions)

@app.route('/plot/<filename>')
def serve_plot(filename):
    """Serve a forecast plot."""
    return send_from_directory(STATIC_FOLDER, filename)

@app.route('/predict', methods=['POST'])
def predict():
    """Make predictions based on input data."""
    try:
        # Parse input JSON
        data = request.json

        # Validate input data
        required_fields = ['amount', 'cumulativeMonthlySpend', 'historicalSpend', 'dayOfWeek', 'categoryEncoded', 'dayOfMonth', 'month']
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing required field: {field}")

        # Preprocess input
        standardized_data = {
            'Amount': float(data['amount']),
            'Cumulative Monthly Spend': float(data['cumulativeMonthlySpend']),
            'Historical Spend': float(data['historicalSpend']),
            'Day of Week': int(data['dayOfWeek']),
            'Category_Encoded': int(data['categoryEncoded']),
            'Day of Month': int(data['dayOfMonth']),
            'Month': int(data['month']),
            'Spending Trend': float(data['cumulativeMonthlySpend']) - float(data['historicalSpend'])
        }
        df = pd.DataFrame([standardized_data])
        X_scaled = scaler.transform(df)

        # Make prediction
        prediction = model.predict(X_scaled)[0]
        overspending = bool(prediction)

        # Insights
        forecasted_spend = standardized_data['Cumulative Monthly Spend'] + (
            30 - standardized_data['Day of Month']
        ) * (standardized_data['Amount'] / standardized_data['Day of Month'])

        percentage_change = (
            (standardized_data['Amount'] - standardized_data['Historical Spend']) /
            standardized_data['Historical Spend'] * 100
        )

        # Recommendations
        recommendations = {
            0: [
                "Consider buying in bulk to reduce grocery costs.",
                "Use loyalty cards to maximize discounts."
            ],
            1: [
                "Set a spending cap for entertainment activities.",
                "Switch to bundled streaming services to save money."
            ]
        }
        category_recommendations = recommendations.get(
            standardized_data['Category_Encoded'], ["Monitor your expenses closely."]
        )

        response = {
            'prediction': "Overspending Detected" if overspending else "Within Budget",
            'insights': {
                'current_week': standardized_data['Amount'],
                'historical_week': standardized_data['Historical Spend'],
                'percentage_change': round(percentage_change, 2),
                'forecasted_monthly_spend': round(forecasted_spend, 2),
            },
            'recommendations': category_recommendations
        }
        return jsonify(response)
    except ValueError as ve:
        return jsonify({'error': str(ve)})
    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)