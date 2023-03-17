import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore'



export default function TransactionForm({uid}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const {addDocument, response } = useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid,
            name,
            number
        })

    }

    useEffect(() => {
      if(response.success) {
        setName('');
        setNumber('');
      }
    }, [response.success])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
            <span>Transaction Name:</span>
            <input 
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                value = {name}>
            </input>
        </label>
        <label>
            <span>Amount (£):</span>
            <input 
                type="number"
                required
                onChange={(e) => setNumber(e.target.value)}
                value = {number}>
            </input>
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </>
  )
}
