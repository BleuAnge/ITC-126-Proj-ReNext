import { useState } from "react";

export default function Feedback_Modal({ 
    current_user_data,
    ticket_data, 
    setModalShow 
    } : any ) {

    const { feedback_rate , feedback_note, feedback_status } = ticket_data || {}
    
    const [ current_feedback_rate, setFeedbackRate ] = useState(
        feedback_rate != undefined ? 
            feedback_rate : 0 )

    const [ current_feedback_note, setFeedbackNote ] = useState(
        feedback_note != undefined ?
            feedback_note : " " )
        
    const [ current_feedback_status, setFeedbackStatus ] = useState(
        feedback_status != undefined ?
            feedback_status : "New" )

    const ticket_sender = current_user_data.username
    const ticket_sender_id = current_user_data.user_id

    const db_url = "http://127.0.0.1:8090/api/collections/feedback_table/records"

    const create = async () => {
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

    return (
        <>
            <div className='modal_body'>
                <label htmlFor='feedbackrate'>Feedback Rate: </label><br></br>
                <input 
                    className='feedbackrate'
                    type='number' 
                    value={ current_feedback_rate }
                    onChange={(e) => {
                        setFeedbackRate(parseInt(e.target.value))
                    }}
                /><br></br><br></br>

                <label htmlFor='feedback_note'>Feedback Note: </label><br></br>
                <textarea
                    className='feedback_note'
                    value={ current_feedback_note }
                    onChange={(e) => {
                        setFeedbackNote(e.target.value)
                    }}
                />
            </div>
            <div className='modal_footer'>
                <button id='cancel_button' onClick={() => {
                    setModalShow(false)
                    }}>
                        Cancel
                </button>
                <button onClick={() => { 
                    create()
                    }}>
                        Save
                </button>
            </div>
        </>
    )
}