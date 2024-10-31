import React from "react";
import "./AssetPage.css";
import { useNavigate } from "react-router-dom";

const AssetPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/createAsset");
    }
    return(
        <html>
        <div style={{
            textAlign: 'center',padding: '5%',
            }}>
            <iframe src="/createAsset" title="Create Asset" height="300" width="25%" style={{
                textAlign: 'center',margin: '5%', 
                border: 'none',
                }}>
            </iframe>
            <iframe src="/createAsset" title="Create Asset" height="300" width="25%" style={{
                textAlign: 'center',margin: '5%',
                border: 'none',
                }}>
            </iframe>
        </div>
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            backgroundColor: 'black',
        }}>
        <iframe src="/assetsList" title="Assets List" height="300" width="100%" style=
        {{
            textAlign: 'center',margin: '2%',border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black'
        }}>
        </iframe>
        </div>
        </html>
    );
}

export default AssetPage;