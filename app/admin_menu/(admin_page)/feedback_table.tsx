import { useEffect, useState } from 'react';
import Global_Modal from '../../(modals)/modal';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';

export default function FeedbackTable({setAdminMenu, setFeedbackMenu}: any) {
    const [ ticket_list, setTicketList ] = useState<any>()
    const [ ticket_data, setTicketData ] = useState<any>([])
    const ticket_type = "Feedback"
    const [ showModal, setModalShow ] = useState(false)

    const baseUrl = 'http://127.0.0.1:8090/api/collections/feedback_table/records?page=1&perPage=30'

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
        await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${ticket_data.id}`, {
            method: 'Delete',
        })
    }

    return (
        <>
            <div className='main_div'>
                <h1 className='table_title'>Feedback Table</h1>
                <div className='table_container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Feedback Sender</th>
                                <th>Feedback Note</th>
                                <th>Feedback Rate</th>
                                <th>Date</th>
                                <th>Feedback Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            ticket_list?.map((ticket: { id: any; }) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <FeedbackList key={ticket.id} feedback={ticket}/>
                                            <td><button className='button_clear' onClick={() => {
                                                    setTicketData(ticket)
                                                    setModalShow(true)
                                                }}>
                                                    Update
                                                </button></td>
                                            <td><button className='button_clear' onClick={()=>{ 
                                                    setTicketData(ticket)
                                                    deleteTicket()
                                                }}>
                                                    Delete
                                                </button></td> 
                                        </tr>
                                    </tbody>
                            )})
                        }
                    </table>
                </div>
                    
                <button className='return_button' onClick={() => {
                    setAdminMenu(true)
                    setFeedbackMenu(false)
                    }}>
                        Return to Admin Menu
                </button>
            </div>
            {
                showModal ?
                    <Global_Modal 
                        ticket_type = { ticket_type } 
                        ticket_data={ ticket_data } 
                        setModalShow={ setModalShow } />
                : null
            }
        </>
    )
}

function FeedbackList({ feedback }: any) {
    const {sender, feedback_rate, feedback_note, feedback_status, created} = feedback || {};

    return (
        <>
            <td><button className='button_clear'>{sender}</button></td>
            <td>{feedback_note}</td>
            <td>{feedback_rate}</td>
            <td>{created}</td>
            <td>{feedback_status}</td>        
        </>     
    )
}