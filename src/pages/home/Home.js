import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from "../../hooks/useAuthContext";

import styles from "./Home.module.css";

import React from 'react'
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

export default function Home() {
  const {user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ["uid", "==", user.uid], //in useCollection we spread the secnd argument so all 3 items in this hook are treated as separate
    ["createdAt", "desc"]
    );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>Could not fetch the data</p>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid = {user.uid}></TransactionForm>
      </div>
    </div>
  )
}
