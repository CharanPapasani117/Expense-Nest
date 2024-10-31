import React from 'react'


const obj = [
    {
        type: 'Bank Loan',
        color: '#f9c74f',
        percent: '45%'
    },
    {
        type: 'Credit Loan',
        color: '#f9c74f',
        percent: '25%'
    },
    {
        type: 'Education Loan',
        color: '#f9c74f',
        percent: '20%'
    },
    {
      type: 'Other Loan',
      color: '#f9c74f',
      percent: '15%'
  }
]

export default function Labels() {
  return (
    <>
        {obj.map((item, index) => <LabelComponent key={index} data = {item}></LabelComponent>)}
    </>
  )
}

function LabelComponent({data}) {
    if(!data) return <></>;
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div className='w-2 h-2 rounded py-3' style = {{background: data.color ?? '#f9c74f' }}></div>
        <h3 className='text-md py-1 '>{data.type ??""}</h3>
      </div>
      <h3 className='font-bold'>{data.percent ?? 0}</h3>
    </div>
  )
}