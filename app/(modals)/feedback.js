'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import "../(utility)/modal.css";

function Feedback_Modal({ setFeedbackShow, isReadOnly }) {
    const [feedback_rate, setFeedbackRate] = useState(0)
    const [feedback_note, setFeedbackNote] = useState(' ')
    const feedback_isNew = true;

    const router = useRouter();

    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/feedback_table/records', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                feedback_rate,
                feedback_note,
                feedback_isNew,
            }),
        });

        setFeedbackRate(0);
        setFeedbackNote(' ');
        router.refresh();
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
                    <label for="feedbackrate">Feedback Rate: </label><br></br>
                    <input 
                        className="feedbackrate"
                        type="number" 
                        value={feedback_rate}
                        onChange={(e) => setFeedbackRate(e.target.value)}
                    /><br></br><br></br>
                    <label for="feedbackrate">Feedback Note: </label><br></br>
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