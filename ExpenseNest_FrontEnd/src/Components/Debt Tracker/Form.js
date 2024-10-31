import React from 'react';
import {useForm} from 'react-hook-form';
import List from './List';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Form() {

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        type: yup.string().required('Type is required'),
        amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='form max-w-sm mx-auto w-96'>
            <h1 className='font-bold pb-3 text-xl text-black'>Enter Your Debts</h1>
            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4'>
                    <div className='input-group mb-0'>
                        <label htmlFor='name' className='block'>Your Debt Name</label>
                        <input id='name' type='text' {...register('name')} placeholder='Gold, House, Car, etc..' className='form-input'/>
                        {errors.name && <p className='error-message text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>
                    <div className='input-group mb-0'>
                        <label htmlFor='type' className='block'>Type</label>
                        <select id='type' className='form-input' {...register('type')}>
                            <option value="Bank Loan" defaultChecked>Bank Loan</option>
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
                        <button className='py-2 bg-green-500 w-full rounded-lg'>Add Debt</button>
                    </div>
                </div>
            </form>
            <List></List>
        </div>
    )
}
