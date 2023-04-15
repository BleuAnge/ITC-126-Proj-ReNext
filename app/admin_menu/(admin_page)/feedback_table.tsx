import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';

export default function FeedbackTable({setAdminMenu, setFeedbackMenu}: any) {
    const [feedbacks, setFeedback] = useState<any>()

    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setFeedbackMenu(false);
    }

    useEffect(() => {
        async function getFeedbackTable() {
            const res = await fetch('http://127.0.0.1:8090/api/collections/feedback_table/records?page=1&perPage=30',
            {cache:'no-store'});
            const data = await res.json();
            setFeedback(data?.items);
            return data?.items as any[];
        }

        getFeedbackTable(); 
    },[])

    return (
        <div>
            <h1>Feedback Table</h1>
            <button onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
            <table>
                <thead>
                    <tr>
                        <th>Feedback Rate</th>
                        <th>Feedback Note</th>
                        <th>Date</th>
                        <th>Feedback Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {
                    feedbacks?.map((feedback: { id: any; }) => {return <FeedbackList feedback={feedback}/>})
                }
                
            </table>
        </div>
    )
}

function FeedbackList({ feedback }: any) {
    const {id, feedback_rate, feedback_note, feedback_isNew, feedback_status, created} = feedback || {};

    return (
        <>
            <tbody>
                    <tr>
                        <td>{feedback_rate}</td>
                        <td><button>{feedback_note}</button></td>
                        <td>{created}</td>
                        <td>{feedback_status}</td>
                        <td><button>Update</button></td>
                        <td><button>Delete</button></td>
                    </tr>
            </tbody>
        </>     
    )
}