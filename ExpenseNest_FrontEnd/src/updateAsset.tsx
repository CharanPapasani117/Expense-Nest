import React, { useEffect, useState } from "react";
import { Asset } from "./types";
import { useNavigate, useParams } from "react-router-dom";

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
        if (name === "assetValue" && parseFloat(value) <= 10000) {
            setError("Value must be greater than 10,000");
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

    return (
        <form onSubmit={saveAsset}>
            <label>Asset Type:&nbsp;</label><br />
            <select
                className="form-control"
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
                className="form-control"
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
                        <span className="input-group-text">$</span>
                    </div>
                    <input
                        type="number"
                        name="assetValue"
                        placeholder="0.00"
                        className="form-control"
                        min="10001"
                        onChange={handleChange}
                        value={asset.assetValue || ""}
                        required
                    />
                </div>
                {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
            </div>
            <label>Asset Description:&nbsp;</label><br />
            <textarea
                name="assetDescription"
                placeholder="Asset Description"
                className="form-control"
                onChange={handleChange}
                value={asset.assetDescription}
                required
            />
            <br />
            <button className="btn button1" type="submit" disabled={!!error}>
                Update Asset
            </button>
        </form>
    );
};

export default UpdateAsset;