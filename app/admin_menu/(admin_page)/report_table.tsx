import { useEffect, useState, } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';
import Global_Modal from '../../(modals)/modal';

export default function ReportTable({setAdminMenu, setReportMenu}: any) {
    const [ ticket_list, setTicketList ] = useState<any>()
    const [ ticket_data, setTicketData ] = useState<any>([])
    const ticket_type = "Report"
    const [ forDeletion, setForDeletion ] = useState(false)
    const [ showModal, setModalShow ] = useState(false)

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
                                    <tbody>
                                        <tr>
                                            <ReportList 
                                                report={ticket} />
                                            <td><button className='button_clear' onClick={() => {
                                                setTicketData(ticket)
                                                setModalShow(true)
                                                }}>
                                                    Update
                                                </button></td>
                                            <td><button className='button_clear' onClick={() => {
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
                    setReportMenu(false)
                    location.reload()
                    }}>
                        Return to Admin Menu
                </button>
            </div>
            {
                showModal ?
                    <Global_Modal 
                        ticket_type = { ticket_type }
                        ticket_data = { ticket_data } 
                        setModalShow = { setModalShow } 
                        forDeletion = { forDeletion } />
                : null
            }
        </>
    )
}

function ReportList({ report }: any) {
    const {ticket_sender,  report_note, report_type, report_status, created} = report || {};

    return (
        <>
            <td>{ticket_sender}</td>
            <td>{report_note}</td>
            <td>{report_type}</td>
            <td>{created}</td>
            <td>{report_status}</td>          
        </>     
    )
}