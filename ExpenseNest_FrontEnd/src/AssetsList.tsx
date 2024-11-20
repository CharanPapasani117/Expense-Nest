import React, { useEffect, useState } from 'react';
import { Asset } from './types.ts';
import { color } from 'chart.js/helpers';
import { useNavigate } from 'react-router-dom';



// const [assets,setAssets] = React.useState([]);

// const assets: Asset[] = [
//     {
//         assetType: "Valuables",
//         assetName: "Gold",
//         assetValue: 1000,
//         assetDescription: "Gold"
//     },
//     {
//         assetType: "Land",
//         assetName: "Land",
//         assetValue: 10000,
//         assetDescription: "Land"
//     },
//     {
//         assetType: "Vehicle",
//         assetName: "Car",
//         assetValue: 20000,
//         assetDescription: "Car"
//     },
//     {
//         assetType: "Jewellery",
//         assetName: "Necklace",
//         assetValue: 5000,
//         assetDescription: "Necklace"
//     },
//     {
//         assetType: "House",
//         assetName: "House",
//         assetValue: 50000,
//         assetDescription: "House"
//     },
//     {
//         assetType: "Others",
//         assetName: "Others",
//         assetValue: 100,
//         assetDescription: "Others"
//     }
// ];


const AssetsList = ({assets:asset}) => {

    const [assets,setAssets] = React.useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    // const [Valuables,setValuables] = React.useState<Asset[]>([]);
    // const [Land,setLand] = React.useState<Asset[]>([]);
    // const [Vehicle,setVehicle] = React.useState<Asset[]>([]);
    // const [Jewellery,setJewellery] = React.useState<Asset[]>([]);
    // const [House,setHouse] = React.useState<Asset[]>([]);
    // const [Others,setOthers] = React.useState<Asset[]>([]);

    const getAllAssets = () => {
        setLoading(true);
        fetch('http://localhost:8080/getAllAssets').
        then(response => response.json()).
        then(
            data => {setAssets(data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        getAllAssets();
    },[]);

    const filterByType = (Type) => {
        return assets.filter(asset => asset.assetType === Type);
    };

    // for(let i=0;i<assets.length;i++) {
    //     if(assets[i].assetType === "Valuables") {
    //         Valuables.push(assets[i]);
    //     }
    //     else if(assets[i].assetType === "Land") {
    //         Land.push(assets[i]);
    //     }
    //     else if(assets[i].assetType === "Vehicle") {
    //         Vehicle.push(assets[i]);
    //     }
    //     else if(assets[i].assetType === "Jewellery") {
    //         Jewellery.push(assets[i]);
    //     }
    //     else if(assets[i].assetType === "House") {
    //         House.push(assets[i]);
    //     }
    //     else if(assets[i].assetType === "Others") {
    //         Others.push(assets[i]);
    //     }
    // }

    const navigate = useNavigate();
    
    const gotoUpdatePage = (Id:number) => {
        console.log(Id);
        navigate(`/assetsList/updateAsset/${Id}`);
    }

    const deleteAsset = (id:number) => {
        fetch('http://localhost:8080/deleteAsset/'+id,{
            method: 'DELETE'
        }).then(response => response.json()).
        catch(error => console.log(error));

        window.location.reload();
        // getAllAssets();

    }

    if (loading) return <p>Loading assets...</p>;



    return (
        <div>
            {/* <h1 style={{color: 'white',textAlign: 'center'}}>Valuables</h1>
            <div className='container'>
                
                {filterByType('Valuables').map((asset) => (
                    <div key={asset.assetName} className='box1'>
                        <div>
                            <h3>{asset.assetName}</h3>
                            <p>{asset.assetType}</p>
                            <p>{asset.assetValue}</p>
                            <p>{asset.assetDescription}</p>
                            <button className="btn button1" onClick={() => deleteAsset(asset.id)}>Delete</button>
                            <button className="btn button1" onClick={() => gotoUpdatePage(asset.id)}>Update</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='container'>
                {filterByType('Land').map((asset) => (
                    <div key={asset.assetName} className='box1'>
                        <div>
                            <h3>{asset.assetName}</h3>
                            <p>{asset.assetType}</p>
                            <p>{asset.assetValue}</p>
                            <p>{asset.assetDescription}</p>
                            <button className="btn button1" onClick={() => deleteAsset(asset.id)}>Delete</button>
                            <button className="btn button1" onClick={() => gotoUpdatePage(asset.id)}>Update</button>
                        </div>
                    </div>
                ))}
            </div> */}

    <div className="container">
      {/* <h1>Asset List</h1> */}
      <div className="row">
        {assets.map((asset) => (
          <div key={asset.id} className="col-sm-12 col-md-6 col-lg-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{color: "black"}}>{asset.assetName}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {asset.assetType} <br />
                  <strong>Value:</strong> {asset.assetValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} <br />
                  <strong>Description:</strong> {asset.assetDescription}
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => gotoUpdatePage(asset.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteAsset(asset.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>

        
    );
};

export default AssetsList;