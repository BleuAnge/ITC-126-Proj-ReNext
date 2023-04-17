'use client';

import styles from './navbar.module.css';
import { useEffect,useState } from 'react';
import NavButton from './nav_button';
import NavDropDown from './nav_dropdown';
import { useGlobalState } from '../(utility)/save_state';


export default function Navbar(){
    const [accounts, setAccounts] = useState<any>()
    const [content, setContent] = useState({
        title: 'Go Back',
        url: './',})
    const [currentUser, setCurrentUser] = useState()

    const baseUrl = 'http://127.0.0.1:8090/api/collections/account_table/records?page=1&perPage=30'
    
    const currentUserdata = {
        username: useGlobalState<any>("username"), 
        usertype: useGlobalState<any>("usertype"), 
        userID: useGlobalState<any>("userID")
    }

    useEffect(() => {
        async function getAccountTable() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setAccounts(data?.items);
        }

        getAccountTable(); 
    },[])

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_nav} >
                <h1 className={styles.current_user}>Current User: { currentUserdata.username }</h1>
                <h1 className={styles.current_usertype}>Current Usertype: { currentUserdata.usertype } / ID: <small>{currentUserdata.userID}</small></h1>
                <NavButton content={content} />
                <NavDropDown accounts={accounts} setCurrentUser={setCurrentUser} />
            </ul>
        </nav>
    )
}