'use client';

import { useState } from "react";
import { useGlobalState } from "../(utility)/save_state";
import "../(utility)/modal.css";

function Feedback_Modal({ setFeedbackShow }: any) {
    const [feedback_rate, setFeedbackRate] = useState(0)
    const [feedback_note, setFeedbackNote] = useState(' ')
    const feedback_status = "New";
    const [currentUserData] = useState({
        username: useGlobalState("username").toString(),
        user_id: useGlobalState("userID").toString(),
    })

    const sender = currentUserData.username.slice(0, currentUserData.username.length - 13)
    const sender_id = currentUserData.user_id.slice(0, currentUserData.user_id.length - 13)
    
    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/feedback_table/records', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                feedback_rate,
                feedback_note,
                feedback_status,
                sender_id,
                sender,
            }),
        });

        setFeedbackRate(0);
        setFeedbackNote(' ');
        setFeedbackShow(false);
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Feedback Ticket</h1>
                    <button onClick={() => setFeedbackShow(false)}> X </button>
                </div>
                <div className="modal_body">
                    <label htmlFor="feedbackrate">Feedback Rate: </label><br></br>
                    <input 
                        className="feedbackrate"
                        type="number" 
                        value={feedback_rate}
                        onChange={(e) => setFeedbackRate(parseInt(e.target.value))}
                    /><br></br><br></br>
                    <label htmlFor="feedbackrate">Feedback Note: </label><br></br>
                    <textarea
                        value={feedback_note}
                        onChange={(e) => setFeedbackNote(e.target.value)}
                    />
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => setFeedbackShow(false)}>Cancel</button>
                    <button onClick={create}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Feedback_Modal