import React from 'react';
import 'boxicons';


const obj = [
    {
        name: 'Gold = $2000',
        color: '#f9c74f'
    },
    {
        name: 'House = $5,00,000',
        color: '#f9c74f'
    },
    {
        name: 'Car  = $23,000',
        color: '#f67f7f'
    }
]


export default function List() {
  return (
    <div className='flex flex-col py-6 gap-3'>
      <h1 className='py-4 font-bold text-xl text-black'>History</h1>
      {obj.map((item,index) => <Transaction key={index} category={item}></Transaction>)}
    </div>
  )
}

function Transaction({category}){
    if (!category) return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-r' style={{borderLeft:`30px solid ${category.color ?? "#e5e5e5"}`, borderRadius:'10px'}}>
            <span className='block w-full'>{category.name ??""}</span>
            <button className='px-3'><box-icon color={category.color ?? "#e5e5e5"} size="14px" name="trash"></box-icon></button>
        </div>
    )
}
