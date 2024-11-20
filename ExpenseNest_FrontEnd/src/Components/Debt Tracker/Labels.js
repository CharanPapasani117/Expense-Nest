import React from 'react';

export default function Labels({ debts = [] }) {
  // Calculate the total amount of all debts
  const totalAmount = debts.reduce((acc, debt) => acc + debt.amount, 0);

  // Group debts by type and calculate the total for each type
  const loanTypeData = debts.reduce((acc, debt) => {
    if (acc[debt.type]) {
      acc[debt.type] += debt.amount;
    } else {
      acc[debt.type] = debt.amount;
    }
    return acc;
  }, {});

  return (
    <>
      {Object.entries(loanTypeData).map(([type, amount], index) => {
        const percentage = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(2) : 0;
        return (
          <LabelComponent key={index} data={{ type, percentage, color: '#F04848' }} />
        );
      })}
    </>
  );
}

function LabelComponent({ data }) {
  if (!data) return null;
  return (
    <div className='labels flex justify-between'>
      <div className='flex gap-2'>
        <div className='w-2 h-2 rounded py-3' style={{ background: data.color ?? '#f9c74f' }}></div>
        <h3 className='text-md py-1'>{data.type ?? ""}</h3>
      </div>
      <h3 className='font-bold'>{`${data.percentage}%`}</h3>
    </div>
  );
}
