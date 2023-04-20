'use client';

import { useEffect, useState, } from 'react';
import '../(utility)/modal.css';
import '../(utility)/table.css';
import Global_Modal from '../(modals)/modal';

export default function ReportTable() {
    const [ ticket_list, setTicketList ] = useState<any>()
    const [ ticket_data, setTicketData ] = useState<any>([])
    const ticket_type = "Report"
    const [ showModal, setModalShow ] = useState(false)
    const [ current_user_data ] = useState<any>(
        JSON.parse(localStorage.getItem("CURRENT_USER_DATA") || " " ))

    const baseUrl = 'http://127.0.0.1:8090/api/collections/report_table/records?page=1&perPage=30'

    useEffect(() => {
        async function getTicketList() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setTicketList(data?.items);
        }

        getTicketList(); 
    },[])

    const deleteTicket = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${ticket_data.id}`, {
            method: 'Delete',
        })
    }

    return (
        <>
            <div className='main_div'>
                <h1 className='table_title'>Report Table</h1>
                <div className='table_container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Report Note</th>
                                <th>Report Type</th>
                                <th>Date Sent</th>
                                <th>Report Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            ticket_list?.map((ticket: { id: any; }) => { 
                                return (
                                    <ReportList 
                                        report={ticket} 
                                        setTicketData={setTicketData} 
                                        setModalShow={setModalShow} 
                                        deleteTicket={deleteTicket}
                                        current_user_data = { current_user_data }/>
                                )
                            })
                        } 
                    </table>
                </div>   
            </div>
            {
                showModal ?
                    <Global_Modal 
                        ticket_type = { ticket_type }
                        ticket_data = { ticket_data } 
                        setModalShow = { setModalShow } />
                : null
            }
        </>
    )
}

function ReportList({ report, setTicketData, setModalShow, deleteTicket, current_user_data }: any) {
    const {ticket_sender,  report_note, report_type, report_status, assigned_to_id, created} = report || {};

    return (
        <>
            {
                current_user_data.user_id === assigned_to_id ? 
                    <tbody>
                        <tr>
                            <td>{ticket_sender}</td>
                            <td>{report_note}</td>
                            <td>{report_type}</td>
                            <td>{created}</td>
                            <td>{report_status}</td> 
                            <td><button className='button_clear' onClick={() => {
                                setTicketData(report)
                                setModalShow(true)
                            }}>
                                Update
                            </button></td>
                            <td><button className='button_clear' onClick={() => {
                                setTicketData(report)
                                deleteTicket()
                            }}>
                                Delete
                            </button></td>
                        </tr>
                    </tbody>                    
                : null
            }
        </>     
    )
}           