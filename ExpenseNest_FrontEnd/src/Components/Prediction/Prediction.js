import React, { useState, useMemo, memo, useEffect } from "react";
import axios from "axios";
import SideBar from '../Sidebar'; 
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

// Memoized Chart Components
const MemoizedBar = memo(Bar);
const MemoizedLine = memo(Line);

const BudgetPredictor = () => {
    const [formData, setFormData] = useState({
        amount: "",
        cumulativeMonthlySpend: "",
        historicalSpend: "",
        dayOfWeek: "",
        dayOfMonth: "",
        month: "",
        categoryEncoded: "",
    });

    const [result, setResult] = useState(null);

    useEffect(() => {
        document.title = "Budget Predictor"; // Set the page title
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            setResult(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Memoized Graph Data
    const spendingGraphData = useMemo(() => {
        if (!result || !result.insights) return null;
        return {
            labels: ["Current Week", "Historical Week", "Forecasted Month"],
            datasets: [
                {
                    label: "Spending (USD)",
                    data: [
                        result.insights.current_week,
                        result.insights.historical_week,
                        result.insights.forecasted_monthly_spend,
                    ],
                    backgroundColor: [
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                    ],
                },
            ],
        };
    }, [result]);

    const lineGraphData = useMemo(() => {
        if (!result || !result.insights) return null;
        return {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Projected"],
            datasets: [
                {
                    label: "Weekly Spending (USD)",
                    data: [
                        result.insights.historical_week,
                        result.insights.current_week,
                        (result.insights.current_week + result.insights.historical_week) / 2,
                        result.insights.forecasted_monthly_spend / 4,
                        result.insights.forecasted_monthly_spend,
                    ],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true,
                },
            ],
        };
    }, [result]);

    return (
        <div className="App d-flex flex-row mt-5">
            <SideBar />
            <div className="d-flex container" style={{ width: "100%" }}>
                {/* Left: Input Form */}
                <div className="p-4 bg-light rounded shadow" style={{ width: "40%" }}>
                    <h2 className="mb-4 text-center text-primary" style={{ fontSize: "1.5rem" }}>Budget Predictor</h2>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>Please enter a valid amount.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cumulativeMonthlySpend" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                            Total amount spent so far in the current month
                            </label>
                            <input
                                type="number"
                                id="cumulativeMonthlySpend"
                                name="cumulativeMonthlySpend"
                                value={formData.cumulativeMonthlySpend}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>This field is required.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="historicalSpend" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                Historical Spend
                            </label>
                            <input
                                type="number"
                                id="historicalSpend"
                                name="historicalSpend"
                                value={formData.historicalSpend}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>This field is required.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dayOfWeek" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                Day of the Week (0=Monday, 6=Sunday)
                            </label>
                            <input
                                type="number"
                                id="dayOfWeek"
                                name="dayOfWeek"
                                value={formData.dayOfWeek}
                                onChange={handleChange}
                                className="form-control"
                                min="0"
                                max="6"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>Enter a value between 0 and 6.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dayOfMonth" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                Day of the Month
                            </label>
                            <input
                                type="number"
                                id="dayOfMonth"
                                name="dayOfMonth"
                                value={formData.dayOfMonth}
                                onChange={handleChange}
                                className="form-control"
                                min="1"
                                max="31"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>Enter a value between 1 and 31.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="month" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                Month
                            </label>
                            <input
                                type="number"
                                id="month"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                className="form-control"
                                min="1"
                                max="12"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>Enter a value between 1 and 12.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryEncoded" className="form-label fw-bold" style={{ fontSize: "1.2rem" }}>
                                <p>Category </p>
                                (0-Groceries, 1-Food, 2-Travel, 3-Entertainment)
                            </label>
                            <input
                                type="number"
                                id="categoryEncoded"
                                name="categoryEncoded"
                                value={formData.categoryEncoded}
                                onChange={handleChange}
                                className="form-control"
                                required
                                style={{ fontSize: "1rem" }}
                            />
                            <div className="invalid-feedback" style={{ fontSize: "0.9rem" }}>This field is required.</div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 w-100 shadow" style={{ fontSize: "1.2rem" }}>
                            Predict
                        </button>
                    </form>
                </div>

                {/* Right: Output Section */}
                <div className="p-4 bg-white rounded shadow ms-5" style={{ width: "60%" }}>
                    {result ? (
                        <>
                            <h4 className={`text-${result.prediction === "Overspending Detected" ? "danger" : "success"}`}>
                                {result.prediction}
                            </h4>

                            <div className="mt-4">
                                <h5>Bar Chart: Spending Overview</h5>
                                <div style={{ height: "400px" }}>
                                    <MemoizedBar data={spendingGraphData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <h5>Line Chart: Spending Trends</h5>
                                <div style={{ height: "400px" }}>
                                    <MemoizedLine data={lineGraphData} options={{ responsive: true, maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-muted text-center">Submit the form to see predictions and insights.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetPredictor;