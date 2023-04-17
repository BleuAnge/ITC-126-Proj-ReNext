import styles from '../navbar/navbar.module.css';
import Link from 'next/link';
export default function DropDown({submenus, setOpenDropDown, setCurrentUser}: any) {

    return (
        <div className={styles.dropdown}>
            {
                submenus?.map((account: { id: any; }) => { return (
                    <DropDownItem account={account} setOpenDropDown={setOpenDropDown} setCurrentUser={setCurrentUser}/>
                )})
            }
        </div>
    )
}

function DropDownItem({account, setOpenDropDown, setCurrentUser} : any) {
    const { username, usertype } = account || {}

    const pageUrl = usertype == "ADMIN" ? "admin_menu" : 
                    usertype == "HR" ? "hr_menu" :
                    usertype == "IT" ? "it_menu" :
                    usertype == "PARTNER" ? "enterprise_menu" :
                    "/" 

    return ( 
        <Link href={pageUrl} className={styles.menu_item} onClick={() => {
            setOpenDropDown(false)
            setCurrentUser(username)
            }}>
            <h4>{username}<br></br><small>{usertype}</small></h4>    
        </Link>
    )
}

