import { useState } from "react";

export default function Feedback_Modal({ 
    current_user_data,
    ticket_data, 
    setModalShow 
    } : any ) {
    
    const { 
        id ,
        ticket_sender,
        ticket_sender_id,
        feedback_rate , 
        feedback_note , 
        feedback_status 
        } = ticket_data || {}
    
    const [ current_feedback_rate, setFeedbackRate ] = useState(
        feedback_rate != undefined ? 
            feedback_rate : 0 )

    const [ current_feedback_note, setFeedbackNote ] = useState(
        feedback_note != undefined ?
            feedback_note : " " )
        
    const [ current_feedback_status, setFeedbackStatus ] = useState(
        feedback_status === "New" ? "Seen" : 
        feedback_status != undefined ?
            feedback_status : "New" )

    const [ current_ticket_sender ] =  useState(
        ticket_sender != undefined ?
            ticket_sender : current_user_data.username )

    const [ current_ticket_sender_id ] = useState(
        ticket_sender_id != undefined ?
            ticket_sender_id : current_user_data.user_id )

    const db_url = "http://127.0.0.1:8090/api/collections/feedback_table/records"

    const createTicket = async () => {
        const ticket_sender = current_ticket_sender
        const ticket_sender_id = current_ticket_sender_id
        const feedback_rate = current_feedback_rate
        const feedback_note = current_feedback_note
        const feedback_status = current_feedback_status

        await fetch(
            db_url,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    ticket_sender,
                    ticket_sender_id,
                    feedback_rate,
                    feedback_note,
                    feedback_status,
                }),
            }
        )

        setModalShow(false) 
    }

    const update = async () => {
        const feedback_status = current_feedback_status

        await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                feedback_status,
            }),
        })

        setModalShow(false)
    }

    return (
        <>
            <div className='modal_body'>
                {
                    current_feedback_status != "New" ?
                        <>
                            <label htmlFor="feedback_sender">Feedback Sender: </label><br></br>
                            <input 
                                className="feedback_sender"
                                type="text" 
                                value={ ticket_sender }
                                readOnly
                            /><br></br><br></br>

                            <label htmlFor="feedback_sender_id">Feedback Sender ID: </label><br></br>
                            <input 
                                className="feedback_sender_id"
                                type="text" 
                                value={ticket_sender_id}
                                readOnly
                            /><br></br><br></br>
                        </> 
                    : null
                }
                <label htmlFor='feedbackrate'>Feedback Rate: </label><br></br>
                <input 
                    className='feedbackrate'
                    type='number' 
                    value={ current_feedback_rate }
                    onChange={(e) => { 
                        setFeedbackRate(parseInt(e.target.value))
                    }}
                    readOnly={ current_feedback_status != "New" ? true : false }
                /><br></br><br></br>

                <label htmlFor='feedback_note'>Feedback Note: </label><br></br>
                <textarea
                    className='feedback_note'
                    value={ current_feedback_note }
                    onChange={(e) => {
                        setFeedbackNote(e.target.value)
                    }}
                    readOnly={ current_feedback_status != "New" ? true : false }
                />
                {
                    current_user_data.usertype === "ADMIN" ?
                        <button onClick={() => {
                            setFeedbackStatus("Approved")
                        }}>
                            Approve Feedback
                        </button>
                    : null
                }
            </div>
            <div className='modal_footer'>
                <button id='cancel_button' onClick={() => {
                    current_feedback_status === "Seen" ?
                        update()
                    : null
                    }}>
                        Cancel
                </button>
                <button onClick = {() => { 
                    current_feedback_status === "New" ?
                        createTicket()
                    : current_feedback_status === "Seen" ?
                        update()
                    : null
                    }}>
                        Save
                </button>
            </div>
        </>
    )
}