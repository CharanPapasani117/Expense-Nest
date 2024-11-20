from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

# Load the trained model and scaler
try:
    model = joblib.load("overspending_model_gbm.pkl")
    scaler = joblib.load("scaler.pkl")
except FileNotFoundError as e:
    print(f"Error loading model or scaler: {e}")
    exit(1)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
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
