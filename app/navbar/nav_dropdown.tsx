import { useState, useEffect } from "react"
import DropDown from '../(utility)/dropdown';
import styles from './navbar.module.css';

interface ICurrentUser {
    username: string,
    usertype: string,
    id: string,
}

export default function NavDropDown({accounts, setCurrentUser}: any) {
    const [openDropDown, setOpenDropDown] = useState(false)

    return(
        <>
            <button className={styles.title_btn} onClick={() => {setOpenDropDown(!openDropDown)}}>
                Accounts
            </button>

            {openDropDown && <DropDown submenus={accounts} setOpenDropDown={setOpenDropDown} setCurrentUser={setCurrentUser} />}
        </>
    )
}