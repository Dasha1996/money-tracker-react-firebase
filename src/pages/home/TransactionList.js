import { useFirestore } from '../../hooks/useFirestore';
import styles from './Home.module.css';

export default function TransactionList({transactions}) {
    const { deleteDocument, response } = useFirestore('transactions');
    console.log(response);
  return (
    <ul className={styles.transactions}>
        {transactions.map((transaction) => {
            return <li key = {transaction.id}>
                <p className={styles['transactions name']}>{transaction.name}</p>
                <p className={styles.amount}>£{transaction.number}</p>
                <button onClick = {() => deleteDocument(transaction.id)}>x</button>
            </li>
        })}
    </ul>
  )
}
