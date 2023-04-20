'use client';

import { useState , useEffect } from 'react'

export default function Confirmation_Modal({
    ticket_type,
    ticket_data,
    setModalShow,
    } : any ){

    const [ baseUrl, setBaseUrl ] = useState<any>()

    useEffect(() => {
        ticket_type === "Feedback" ? 
            setBaseUrl(`http://127.0.0.1:8090/api/collections/feedback_table/records/${ticket_data.id}`) :
        ticket_type === "Report" ?
            setBaseUrl(`http://127.0.0.1:8090/api/collections/report_table/records/${ticket_data.id}`) :
            setBaseUrl(`http://127.0.0.1:8090/api/collections/application_table/records/${ticket_data.id}`)
    },[])
   
    
    const deleteTicket = async () => {
        await fetch(baseUrl, {
            method: 'Delete',
        })

        setModalShow(false)
        location.reload()
    }

    return (
        <>
            <div className='modal_body'>
                <h1> Are you sure you wanna Delete the Ticket? </h1>
            </div>
            <div className='modal_footer'>
                <button id='cancel_button' onClick={() => {
                        setModalShow(false)
                    }}>
                        Cancel
                </button>
                <button onClick = {() => { 
                        deleteTicket()
                    }}>
                        Yes
                </button>
            </div>
        </>
    )
}