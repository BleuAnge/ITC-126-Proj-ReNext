import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';
import Global_Modal from '../../(modals)/modal';

export default function ApplicationTable({setAdminMenu, setApplyMenu}: any) {
    const [ ticket_list, setTicketList ] = useState<any>()
    const [ ticket_data, setTicketData ] = useState<any>([])
    const ticket_type = "Application"
    const [ forDeletion, setForDeletion ] = useState(false)
    const [showModal, setModalShow] = useState(false)

    const baseUrl = 'http://127.0.0.1:8090/api/collections/application_table/records?page=1&perPage=30'

    useEffect(() => {
        async function getTicketList() {
            const res = await fetch(baseUrl ,
            {cache:'no-store'});
            const data = await res.json();
            setTicketList(data?.items);
        }

        getTicketList(); 
    },[])

    const deleteTicket = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/application_table/records/${ticket_data.id}`, {
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
                            ticket_list?.map((ticket: { id: any; }) => { 
                                return ( 
                                    <tbody>
                                        <tr>
                                            <ApplicationList 
                                                application={ticket} /> 
                                                    <td><button className='button_clear' onClick={() => {
                                                        setTicketData(ticket)
                                                        setModalShow(true)
                                                    }}>
                                                        Update
                                                        </button></td>
                                                    <td><button className='button_clear' onClick={()=>{ 
                                                            setTicketData(ticket)
                                                            setForDeletion(true)
                                                            setModalShow(true)
                                                        }}>
                                                            Delete
                                                        </button></td> 
                                        </tr>
                                    </tbody> 
                                )
                            })
                        }  
                    </table>
                </div>
                <button className='return_button' onClick={() => {
                    setAdminMenu(true)
                    setApplyMenu(false)
                    location.reload()
                    }}>
                        Return to Admin Menu
                </button>
            </div>
            {
                showModal ?
                    <Global_Modal 
                        forDeletion = { forDeletion }
                        ticket_type = { ticket_type } 
                        ticket_data={ ticket_data } 
                        setModalShow={ setModalShow } />
                : null
            }
        </> 
    )
}

function ApplicationList({ application }: any) {
    const { first_name, last_name, email, application_status, created } = application || {};

    return (
        <>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{created}</td>
            <td>{application_status}</td>        
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
    
    const {first_name, last_name, email, job_position} = applicationData || {}

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