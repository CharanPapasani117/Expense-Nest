import React from "react";
import "./CreateAsset.css";
import { Asset } from "./types.ts";

const CreateAsset = () => {
    const [asset, setAsset] = React.useState<Asset>({
        id: 0,
        assetType: "",
        assetName: "",
        assetValue: 0,
        assetDescription: ""
    });
    const [amount, setAmount] = React.useState("1000");
    const [error,setError] = React.useState('');

    // const handleChange = (e) => {
    //     // const value = e.target.value;
    //     // const numericValue = value.replace(/[^0-9.]/g,'');
    //     // if(numericValue === '') {
    //     //     setAmount(0);
    //     // } else if(/^[0-9]*\.?[0-9]*$/.test(numericValue)) {
    //     //     setAmount(numericValue);
    //     // }
    //     setAmount(e.target.value);
    // }
    
    const handleChange = (e) => {
        const value = e.target.value;
        if(value <= 10000) {
            setError('Value must be greater than 10,000');
        }
        else {
            setError('');
        }
        asset.assetValue = e.target.valueAsNumber
    };

    const saveAsset = (e) => {
        fetch('http://localhost:8080/createAsset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asset)
        })
        .then(response => response.json()).
        catch(error => console.log(error));
    };

    const formatValue = (value) => {
        if(value === '') {
            return '';
        }
        const parsedAmount = parseFloat(value);
        return new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD',
            }
        ).format(parsedAmount);
    }

    return (

        <form onSubmit={saveAsset}>
            <label>Asset Type:&nbsp;</label><br></br>
            <select className="form-control"
            onChange={(e) => asset.assetType = e.target.value} required>
                <option value="">Select Asset Type</option>
                <option value="Valuables">Gold/Weighted Valuables</option>
                <option value="Land">Land</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Jewellery">Jewellery</option>
                <option value="House">House</option>
                <option value="Others">Others</option>
            </select>
            <br></br>
            <label>Asset Name:&nbsp;</label><br></br>
            <input type="text" placeholder="Asset Name" className="form-control" 
                onChange={(e) => asset.assetName = e.target.value}
                required minLength={1}/><br></br>
            {/* <label>Asset Value:&nbsp;</label><br></br> */}
            {/* <input type="number" placeholder="Asset Value" className="form-control"/><br></br> */}
            <div className="form-group">
                <label>Asset Value:&nbsp;</label><br></br>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input 
                        type="number" 
                        placeholder="0.00" 
                        className="form-control" 
                        min='10001'
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        // value={formatValue(amount)}
                        // onChange={handleChange}
                        required
                        /><br></br>
                        
                </div>
                {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
            </div>
            <label>Asset Description:&nbsp;</label><br></br>
            <textarea placeholder="Asset Description" className="form-control"
            onChange={(e) => asset.assetDescription = e.target.value} required/><br></br>
            <button className="btn button1" type="submit" >Add Asset</button>
        </form>
    );
}

export default CreateAsset;