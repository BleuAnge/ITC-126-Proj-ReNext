'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFeedback() {
    const [feedback_rate, setFeedbackRate] = useState('');
    const [feedback_note, setFeedbackNote] = useState('');

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
            }),
        });

        setFeedbackRate('');
        setFeedbackNote('');

        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create New Feedback</h3>
            <input 
            type="text" 
            placeholder="Rate Here" 
            value={feedback_rate}
            onChange={(e) => setFeedbackRate(e.target.value)}/>
            <textarea
            placeholder="Feedback Here"
            value={feedback_note}
            onChange={(e) => setFeedbackNote(e.target.value)}/>
            <button type="submit">Send Feedback</button>
        </form>
    )
}