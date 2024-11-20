import React, { createContext, useState, useCallback } from 'react';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [globalIncomes, setGlobalIncomes] = useState([
    { id: 1, title: 'Salary', amount: 5000, date: '2024-01-01', category: 'Employment', member: 'Prava', description: 'Monthly salary' },
    { id: 2, title: 'Freelance Work', amount: 1000, date: '2024-01-15', category: 'Self-employment', member: 'Nani', description: 'Website development project' },
    { id: 3, title: 'Dividend', amount: 200, date: '2024-01-20', category: 'Investments', member: 'Mahesh', description: 'Quarterly dividend payment' }
  ]);
  
  const [globalExpenses, setGlobalExpenses] = useState([
    { id: 2, title: 'Mac Book', amount: 2000, date: '2024-01-10', category: 'Personal', member: 'Prava', description: 'For college' },
    { id: 3, title: 'University Fee', amount: 5000, date: '2024-01-10', category: 'Education', member: 'Nani', description: 'First year Fee' },
    { id: 4, title: 'University Fee', amount: 5000, date: '2024-10-10', category: 'Education', member: 'Nani', description: 'Second semester year Fee' }
  ]);


  const updateGlobalIncomes = useCallback((newIncomes) => {
    setGlobalIncomes(newIncomes);
  }, []);

  const updateGlobalExpenses = useCallback((newExpenses) => {
    setGlobalExpenses(newExpenses);
  }, []);

  
  const addIncome = useCallback((newIncome) => {
    setGlobalIncomes(prevIncomes => [...prevIncomes, newIncome]);
  }, []);

  const addExpense = useCallback((newExpense) => {
    setGlobalExpenses(prevExpenses => [...prevExpenses, newExpense]);
  }, []);

  
  const deleteIncome = useCallback((id) => {
    setGlobalIncomes(prevIncomes => prevIncomes.filter(income => income.id !== id));
  }, []);

  const deleteExpense = useCallback((id) => {
    setGlobalExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  }, []);

  
  const editIncome = useCallback((id, updatedIncome) => {
    setGlobalIncomes(prevIncomes => 
      prevIncomes.map(income => income.id === id ? updatedIncome : income)
    );
  }, []);

  const editExpense = useCallback((id, updatedExpense) => {
    setGlobalExpenses(prevExpenses => 
      prevExpenses.map(expense => expense.id === id ? updatedExpense : expense)
    );
  }, []);

  const value = {
    globalIncomes,
    globalExpenses,
    updateGlobalIncomes,
    updateGlobalExpenses,
    addIncome,
    addExpense,
    deleteIncome,
    deleteExpense,
    editIncome,
    editExpense
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
