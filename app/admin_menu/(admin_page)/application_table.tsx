import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';

export default function ApplicationTable({setAdminMenu, setApplyMenu}: any) {
    const [applications, setApplication] = useState<any>()

    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setApplyMenu(false);
    }

    useEffect(() => {
        async function getApplicationTable() {
            const res = await fetch('http://127.0.0.1:8090/api/collections/application_table/records?page=1&perPage=30',
            {cache:'no-store'});
            const data = await res.json();
            setApplication(data?.items);
            return data?.items as any[];
        }

        getApplicationTable(); 
    },[])

    return (
        <div className='main_div'>
            <h1 className='table_title'>Application Table</h1>
            <table className='table_container'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Application Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    applications?.map((application: { id: any; }) => {return <ApplicationList application={application}/>})
                }  
            </table>
            <button className='return_button' onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
        </div>
    )
}

function ApplicationList({ application }: any) {
    const {id, first_name, last_name, email, application_status, created} = application || {};

    return (
        <>
            <tbody>
                    <tr>
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{email}</td>
                        <td>{created}</td>
                        <td>{application_status}</td>
                        <td><button>Update</button></td>
                        <td><button>Delete</button></td>
                    </tr>
            </tbody>
        </>     
    )
}