import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout";

import React from 'react'

export default function Navbar() {
  //we return it at the bottom
  const {logout} = useLogout();
  const { user } = useAuthContext();
  return (
   <div className={styles.navbar}>
        <ul className={styles.navbar}>
        <li className = {styles.title}><Link to ="/">myMoney</Link></li>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Singup</Link></li>
          </>
          )}
          {user && (
            <>
            <li>hello, {user.displayName}</li>
          <li>
            <button className = "btn" onClick = {logout}>Logout</button>
          </li>
          </>
          )}
        </ul>
   </div>
  )
  
}
