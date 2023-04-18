'use client';

import { useEffect, useState } from 'react';
import '../(utility)/modal.css';
import '../(utility)/table.css';

export default function ApplicationTable({setAdminMenu, setApplyMenu}: any) {
    const [currentUserData] = useState(JSON.parse(localStorage.getItem('CURRENT_USER_DATA') || '{}'))
    const [applications, setApplication] = useState<any>()
    const [applicationID, setApplicationID] = useState()
    const [showModal, setModalShow] = useState(false)

    useEffect(() => {
        console.log(currentUserData)
    }, [currentUserData])

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

    const deleteTicket = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/application_table/records/${applicationID}`, {
            method: 'Delete',
        })
    }

    return (
        <>
            <div className='main_div'>
                <h1 className='table_title'>Application Table</h1>
                <div  className='table_container'>
                    <table>
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
                            applications?.map((application: { id: any; }) => { return (
                                
                                        <ApplicationList 
                                            application={ application } 
                                            currentUserData={ currentUserData }  
                                            setApplicationID={ setApplicationID }
                                            setModalShow={setModalShow}
                                            deleteTicket={deleteTicket}/>
                                        
                                   
                            )})
                        }  
                    </table>
                </div>
            </div>
            {
                showModal ?
                    <ApplicationTicket applicationID={applicationID} setModalShow={setModalShow} />
                : null
            }
        </> 
    )
}

function ApplicationList({ application, currentUserData, setApplicationID, setModalShow, deleteTicket }: any) {
    const {assigned_to_ID, first_name, last_name, email, application_status, created} = application || {};
    const { usertype, id } = currentUserData || {}

    return (
        <>
            {
                assigned_to_ID === id ?
                    <tbody>
                        <tr>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{email}</td>
                            <td>{created}</td>
                            <td>{application_status}</td>
                            <td>
                                <button className='button_clear' onClick={() => {
                                setApplicationID(application.id)
                                setModalShow(true)}}>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className='button_clear' onClick={()=>{ 
                                setApplicationID(application.id)
                                deleteTicket() }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                : null
            }
        </>     
    )
}

function ApplicationTicket({ applicationID, setModalShow }: any) {
    const [applicationData, setApplicationData] = useState<any>()
    const [application_status, setApplicationStatus] = useState("Seen")

    useEffect(() => {
        async function getApplicationTable() {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/application_table/records/${applicationID}`);
            const data = await res.json();
            setApplicationData(data);
        }

        getApplicationTable(); 
    },[])
    
    const { first_name, last_name, email, job_position } = applicationData || {}

    const update = async() => {
        await fetch(`http://127.0.0.1:8090/api/collections/application_table/records/${applicationID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                application_status,
            }),
        });
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Job Application Ticket</h1>
                    <button onClick={() => setModalShow(false)}> X </button>
                </div>
                <div className="modal_body">
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        className="firstName"
                        type="text" 
                        value={first_name}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        className="lastName"
                        type="text" 
                        value={last_name}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="email">Email: </label>
                    <input 
                        className="email"
                        type="text" 
                        value={email}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="jobPosition">Job Position: </label>
                    <input
                        className="jobPosition"
                        type='text'
                        value={job_position}
                        readOnly
                    /><br></br><br></br>
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => setModalShow(false)}>Cancel</button>
                    <button onClick={() => setModalShow(false)}>Save</button>
                </div>
            </div>
        </div>
    )
}