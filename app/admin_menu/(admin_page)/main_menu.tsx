import { useState, useEffect } from 'react';
import Global_Modal from '../../(modals)/modal';

export default function MainMenu({
    setAdminMenu, 
    setFeedbackMenu, 
    setReportMenu, 
    setApplyMenu, 
    } : any){
    
    const [ showModal, setModalShow ] = useState(false)
    const [ ticket_list, setTicketList ] = useState<any>() 
    const [ ticket_data, setTicketData ] = useState<any>()
    const ticket_type = "Report" 

    useEffect(() => {
        async function getTicketList() {
            const res = await fetch('http://127.0.0.1:8090/api/collections/report_table/records?page=1&perPage=30',
            {cache:'no-store'});
            const data = await res.json();
            setTicketList(data?.items);
        }

        getTicketList(); 
    },[])

    return (
        <div className='admin-main-body'>
            <div className='admin-body-divider'>
                <div className='admin-ticket-container'>
                    {
                        ticket_list?.map((ticket: { id: any; }) => { return <NewTicket 
                            key={ticket.id} 
                            ticket={ticket} 
                            setTicketData = { setTicketData }
                            setModalShow = { setModalShow } />})
                    }
                </div>

                <div className='admin-menu-container'>
                    <button id='admin-feedback-section' className='admin-section-card' onClick={() => {
                        setAdminMenu(false) 
                        setFeedbackMenu(true)
                        }}>
                        <h1 className='admin-menu-link'>
                            Customer Feedback Tickets
                        </h1>
                    </button>
                    <button id='admin-report-section' className='admin-section-card' onClick={() => {
                        setAdminMenu(false) 
                        setReportMenu(true)
                        }}>
                        <h1 className='admin-menu-link'>
                            Customer Report Tickets
                        </h1>
                    </button>
                    <button id='admin-apply-section' className='admin-section-card' onClick={() => {
                        setAdminMenu(false) 
                        setApplyMenu(true)
                        }}>
                        <h1 className='admin-menu-link'>
                            Application Tickets
                        </h1>
                    </button>
                </div>
            </div>

            {/*draw a admin inanis for this part*/}
            <div className='admin-image-section'>
                
            </div>
            {
                showModal ?
                    <Global_Modal 
                        ticket_type = { ticket_type } 
                        ticket_data={ ticket_data } 
                        setModalShow={ setModalShow } />
                : null
            }
        </div>
    )
}

//shows new ticket on admin main menu
//to be refactored
function NewTicket({ ticket, setTicketData, setModalShow }: any) {
    const {ticket_sender, report_type, report_status} = ticket || {};

    return (
        <>
            {
                report_status == "New" ? 
                    <button className='admin-section-card' onClick={() => {
                        setTicketData(ticket)
                        setModalShow(true)
                    }}>
                        <h2>{ticket_sender}</h2>
                        <p>{report_type}</p>
                    </button> 
                :null
            }
        </>     
    )
}