import React from 'react';
import 'boxicons';

export default function List({ debts = [], onEdit, onDelete }) {
    return (
        <div className='flex flex-col py-6 gap-3'>
            <h1 className='py-4 font-bold text-xl text-black'>History</h1>
            {debts.length > 0 ? (
                debts.map((item, index) => (
                    <Transaction key={index} category={item} onEdit={onEdit} onDelete={onDelete} />
                ))
            ) : (
                <p>No debts found</p>
            )}
        </div>
    );
}

function Transaction({ category, onEdit, onDelete }) {
    return (
        <div className='item flex justify-between bg-gray-50 py-2 rounded-r'
            style={{ borderLeft: `30px solid ${category.color ?? "#e5e5e5"}`, borderRadius: '10px' }}>
            <span className='block w-full'>{`${category.name} = $${category.amount}`}</span>
            <div className='flex gap-2'>
                <button onClick={() => onEdit(category)} className='px-2'><box-icon color={category.color ?? "#e5e5e5"} size="14px" name="edit"></box-icon></button>
                <button onClick={() => onDelete(category.id)} className='px-2'><box-icon color={category.color ?? "#e5e5e5"} size="14px" name="trash"></box-icon></button>
            </div>
        </div>
    );
}
