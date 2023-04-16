import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';

export default function FeedbackTable({setAdminMenu, setFeedbackMenu}: any) {
    const [feedbacks, setFeedback] = useState<any>([])
    const [feedbackID, setFeedbackID] = useState()
    const [showModal, setModalShow] = useState(false)

    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setFeedbackMenu(false);
    }

    const baseUrl = 'http://127.0.0.1:8090/api/collections/feedback_table/records?page=1&perPage=30'

    useEffect(() => {
        async function getFeedbackTable() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setFeedback(data?.items);
        }

        getFeedbackTable(); 
    },[])

    const deleteTicket = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${feedbackID}`, {
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
                                <th>Feedback Note</th>
                                <th>Feedback Rate</th>
                                <th>Date</th>
                                <th>Feedback Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            feedbacks?.map((feedback: { id: any; }) => {return (
                                    <tbody>
                                        <tr>
                                            <FeedbackList key={feedback.id} feedback={feedback}/>
                                            <td><button className='button_clear' onClick={() => {
                                                    setFeedbackID(feedback.id)
                                                    setModalShow(true)
                                                }}>
                                                    Update
                                                </button></td>
                                            <td><button className='button_clear' onClick={()=>{ 
                                                    setFeedbackID(feedback.id)
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
                    
                <button className='return_button' onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
            </div>
            {
                showModal ?
                    <FeedbackTicket feedbackID={feedbackID} setModalShow={setModalShow} />
                : null
            }
        </>
    )
}

function FeedbackList({ feedback }: any) {
    const {feedback_rate, feedback_note, feedback_status, created} = feedback || {};

    return (
        <>
            <td><button className='button_clear'>{feedback_note}</button></td>
            <td>{feedback_rate}</td>
            <td>{created}</td>
            <td>{feedback_status}</td>        
        </>     
    )
}

function FeedbackTicket({ feedbackID, setModalShow }: any) {
    const [feedbackData, setFeedbackData] = useState<any>()
    const [feedback_status, setFeedbackStatus] = useState("Seen")

    useEffect(() => {
        async function getFeedbackTable() {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${feedbackID}`);
            const data = await res.json();
            setFeedbackData(data);
        }

        getFeedbackTable(); 
    },[])

    const { feedback_rate, feedback_note } = feedbackData || {}

    const update = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${feedbackID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                feedback_status,
            }),
        })
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Feedback Ticket</h1>
                    <button onClick={() => {
                        update()
                        setModalShow(false)
                    }}> 
                        X 
                    </button>
                </div>
                <div className="modal_body">
                    <label htmlFor="feedbackrate">Feedback Rate: </label><br></br>
                    <input 
                        className="feedbackrate"
                        type="number" 
                        value={feedback_rate}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="feedbackrate">Feedback Note: </label><br></br>
                    <textarea
                        value={feedback_note}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="feedbackapproved">Feedback Rate: </label><br></br>
                    <button onClick={() => {
                        setFeedbackStatus("Approved")
                    }}>
                        Approve Feedback
                    </button>
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => {
                        update()
                        setModalShow(false)
                    }}>
                        Cancel
                    </button>
                    <button onClick={() => {
                        update()
                        setModalShow(false)
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}