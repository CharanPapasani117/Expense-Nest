import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Form({ onDebtAdded, onDebtUpdated, selectedDebt, setSelectedDebt, isEditForm = false }) {
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        type: yup.string().required('Type is required'),
        amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive')
    });

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { name: '', type: '', amount: '' }
    });

    useEffect(() => {
        if (selectedDebt) {
            setValue('name', selectedDebt.name);
            setValue('type', selectedDebt.type);
            setValue('amount', selectedDebt.amount);
        } else {
            reset({ name: '', type: '', amount: '' });
        }
    }, [selectedDebt, setValue, reset]);

    const onSubmit = (data) => {
        if (selectedDebt) {
            // Editing existing debt
            fetch(`http://localhost:8080/api/debts/${selectedDebt.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(updatedDebt => {
                onDebtUpdated(updatedDebt);
                setSelectedDebt(null);
                reset();
            })
            .catch(error => console.error('Error:', error));
        } else {
            // Adding new debt
            fetch('http://localhost:8080/api/debts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(newDebt => {
                onDebtAdded(newDebt);
                reset();
            })
            .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div className={`form max-w-sm mx-auto w-96 mt-5 ${isEditForm ? 'border border-blue-500 p-4' : ''}`}>
            <h1 className='font-bold pb-3 text-xl text-black'>{isEditForm ? 'Edit Debt' : 'Enter Your Debts'}</h1>
            <form id={isEditForm ? 'edit-form' : 'form'} onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <div className='input-group mb-0'>
                        <label htmlFor='name' className='block'>Your Debt Name</label>
                        <input id='name' type='text' {...register('name')} placeholder='Gold, House, Car, etc..' className='form-input'/>
                        {errors.name && <p className='error-message text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>
                    <div className='input-group mb-0'>
                        <label htmlFor='type' className='block'>Type</label>
                        <select id='type' className='form-input' {...register('type')}>
                            <option value="Bank Loan">Bank Loan</option>
                            <option value="Credit Loan">Credit Loan</option>
                            <option value="Education Loan">Education Loan</option>
                            <option value="Other Loan">Other Loan</option>
                        </select>
                    </div>
                    <div className='input-group mb-2'>
                        <label htmlFor='amount' className='block'>Amount</label>
                        <input id='amount' type='number' {...register('amount')} placeholder='Amount' className='form-input'/>
                        {errors.amount && <p className='error-message text-red-500 text-sm'>{errors.amount.message}</p>}
                    </div>
                    <div className='submit-btn'>
                        <button className={`py-2 w-full rounded-lg ${isEditForm ? 'bg-blue-500' : 'bg-green-500'}`}>{isEditForm ? 'Update Debt' : 'Add Debt'}</button>
                        {isEditForm && (
                            <button type='button' className='py-2 bg-red-500 w-full rounded-lg mt-2' onClick={() => setSelectedDebt(null)}>Cancel</button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
