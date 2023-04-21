import { useState } from "react"
import DropDown from '../(utility)/dropdown';
import './navbar.css';

export default function NavDropDown({accounts, setCurrentUser}: any) {
    const [openDropDown, setOpenDropDown] = useState(false)

    return(
        <>
            <button className='account_button' onClick={() => {setOpenDropDown(!openDropDown)}}>
                Accounts
            </button>

            {openDropDown && <DropDown submenus={accounts} setOpenDropDown={setOpenDropDown} setCurrentUser={setCurrentUser} />}
        </>
    )
}