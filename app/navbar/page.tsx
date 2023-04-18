'use client';

import styles from './navbar.module.css';
import { useEffect,useState, useRef } from 'react';
import NavButton from './nav_button';
import NavDropDown from './nav_dropdown';

export default function Navbar(){
    const [accounts, setAccounts] = useState<any>()
    const [content, setContent] = useState({
        title: 'Go Back',
        url: './',})
    const [currentUserData, setCurrentUserData] = useState<any>(JSON.parse(window.localStorage.getItem('CURRENT_USER_DATA') || '{}'))
    const [currentUser, setCurrentUser] = useState<any>(JSON.parse(window.localStorage.getItem('CURRENT_USER_DATA') || '{}') || {username: "John Doe", usertype: "HIDDEN", id: "this nuts"})

    useEffect(() => {
        window.localStorage.setItem('CURRENT_USER_DATA', JSON.stringify(currentUser))
        setCurrentUserData(JSON.parse(window.localStorage.getItem('CURRENT_USER_DATA') || '{}'))
    }, [currentUser])

    const baseUrl = 'http://127.0.0.1:8090/api/collections/account_table/records?page=1&perPage=30'

    useEffect(() => {
        
        async function getAccountTable() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setAccounts(data?.items);
        }

        getAccountTable(); 
    },[])

    const { username, usertype, id} = currentUserData || {}

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_nav} >
                <h1 className={styles.current_user}>Current User: { username}</h1>
                <h1 className={styles.current_usertype}>Current Usertype: { usertype } / ID: <small>{ id }</small></h1>
                <NavButton content={content} />
                <NavDropDown accounts={accounts} setCurrentUser={setCurrentUser} />
            </ul>
        </nav>
    )
}