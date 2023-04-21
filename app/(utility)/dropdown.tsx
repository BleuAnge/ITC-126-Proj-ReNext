import '../navbar/navbar.css';
import Link from 'next/link';

export default function DropDown({ submenus, setOpenDropDown, setCurrentUser}: any) {
    return (
        <div className='dropdown'>
            {
                submenus?.map((account: { id: any; }) => { return (
                    <DropDownItem account={account} setOpenDropDown={setOpenDropDown} setCurrentUser={setCurrentUser}/>
                )})
            }
        </div>
    )
}

function DropDownItem({account, setOpenDropDown, setCurrentUser} : any) {
    const { id, username, usertype } = account || {}

    const pageUrl = usertype == "ADMIN" ? "admin_menu" : 
                    usertype == "HR" ? "hr_menu" :
                    usertype == "IT" ? "it_menu" :
                    usertype == "PARTNER" ? "enterprise_menu" :
                    "/" 

    return ( 
        <Link href={pageUrl} className='dropdown_item' onClick={() => {
            setOpenDropDown(false)
            setCurrentUser({username: username, usertype: usertype, user_id: id})
            }}>
            <h4>{username}<br></br><small>{usertype}</small></h4>    
        </Link>
    )
}

