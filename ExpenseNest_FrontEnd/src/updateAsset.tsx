import React, { useEffect, useState } from "react";
import { Asset } from "./types";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

const UpdateAsset: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [asset, setAsset] = useState<Asset>({
        id: 0,
        assetType: "",
        assetName: "",
        assetValue: 0,
        assetDescription: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fetch asset details on mount
    useEffect(() => {
        fetch(`http://localhost:8080/getAsset/${id}`)
            .then((response) => response.json())
            .then((data) => setAsset(data))
            .catch((error) => console.error("Error fetching asset:", error));
    }, [id]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Update state immutably
        setAsset((prevAsset) => ({
            ...prevAsset,
            [name]: name === "assetValue" ? parseFloat(value) : value, // Convert assetValue to a number
        }));

        // Validate asset value
        if (name === "assetValue" && parseFloat(value) <= 999) {
            setError("Value must be greater than 999");
        } else {
            setError("");
        }
    };

    // Save updated asset
    const saveAsset = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("http://localhost:8080/createAsset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(asset),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Asset updated:", data);
                alert("Asset updated successfully!");
            })
            .catch((error) => console.error("Error updating asset:", error));
        navigate("/asset");
    };

    // Inline styles
    const styles = {
        formContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
        },
        formBox: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
        },
        title: {
            textAlign: "center" as const,
            marginBottom: "1.5rem",
            color: "#333333",
        },
        formControl: {
            width: "100%",
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "5px",
            border: "1px solid #ced4da",
            fontSize: "1rem",
        },
        inputGroupText: {
            backgroundColor: "#e9ecef",
            border: "1px solid #ced4da",
            borderRight: "none",
            fontSize: "1rem",
            color: "#495057",
        },
        button: {
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1rem",
            padding: "0.75rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            textAlign: "center" as const,
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        errorText: {
            color: "red",
            marginTop: "0.5rem",
        },
    };

    return (
        <div style={styles.formContainer}>
            <Sidebar/>
            <form onSubmit={saveAsset} style={styles.formBox}>
                <h2 style={styles.title}>Update Asset</h2>
                <label>Asset Type:&nbsp;</label><br />
                <select
                    style={styles.formControl}
                    name="assetType"
                    onChange={handleChange}
                    value={asset.assetType}
                    required
                >
                    <option value="">Select Asset Type</option>
                    <option value="Valuables">Gold/Weighted Valuables</option>
                    <option value="Land">Land</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="House">House</option>
                    <option value="Others">Others</option>
                </select>
                <br />
                <label>Asset Name:&nbsp;</label><br />
                <input
                    type="text"
                    name="assetName"
                    placeholder="Asset Name"
                    style={styles.formControl}
                    onChange={handleChange}
                    value={asset.assetName}
                    required
                    minLength={1}
                />
                <br />
                <div className="form-group">
                    <label>Asset Value:&nbsp;</label><br />
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span style={styles.inputGroupText}>$</span>
                        </div>
                        <input
                            type="number"
                            name="assetValue"
                            placeholder="0.00"
                            style={styles.formControl}
                            min="1001"
                            onChange={handleChange}
                            value={asset.assetValue || ""}
                            required
                        />
                    </div>
                    {error && <p style={styles.errorText}>{error}</p>}
                </div>
                <label>Asset Description:&nbsp;</label><br />
                <textarea
                    name="assetDescription"
                    placeholder="Asset Description"
                    style={styles.formControl}
                    onChange={handleChange}
                    value={asset.assetDescription}
                    required
                />
                <br />
                <button style={styles.button} type="submit" disabled={!!error}>
                    Update Asset
                </button>
            </form>
        </div>
    );
};

export default UpdateAsset;
