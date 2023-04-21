'use client';

import './navbar.css';
import { useEffect,useState } from 'react';
import NavDropDown from './nav_dropdown';

export default function Navbar({setCurrentUserData}: any){
    const [accounts, setAccounts] = useState<any>()
    const [currentUser, setCurrentUser] = useState<any>(JSON.parse(localStorage.getItem('CURRENT_USER_DATA') || '{}') || {username: "John Doe", usertype: "HIDDEN", user_id: "this nuts"})
    const [ ticket_list ] = useState<any>()
    useEffect(() => {
        window.localStorage.setItem('CURRENT_USER_DATA', JSON.stringify(currentUser))
        setCurrentUserData(JSON.parse(localStorage.getItem('CURRENT_USER_DATA') || '{}'))
        localStorage.setItem('CURRENT_ADMIN_STATE', JSON.stringify(true))
        localStorage.setItem('CURRENT_FEEDBACK_STATE', JSON.stringify(false))
        localStorage.setItem('CURRENT_REPORT_STATE', JSON.stringify(false))
        localStorage.setItem('CURRENT_APPLY_STATE', JSON.stringify(false))
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

    return (
        <nav className='navbar'>
            <ul className='navbar_buttons' >
                {
                    currentUser.usertype === "USER" ?
                        ticket_list != undefined ?
                            <button className='title_btn'>New Message</button>
                        : null
                    : null
                }
                <NavDropDown accounts={accounts} setCurrentUser={setCurrentUser} />
            </ul>
        </nav>
    )
}