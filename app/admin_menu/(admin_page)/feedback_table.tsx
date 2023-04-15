import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';

export default function FeedbackTable({setAdminMenu, setFeedbackMenu}: any) {
    const [feedbacks, setFeedback] = useState<any>([])

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
            return data?.items as any[];
        }

        getFeedbackTable(); 
    },[])

    return (
        <div className='main_div'>
            <h1 className='table_title'>Feedback Table</h1>
            <table className='table_container'>
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
                    feedbacks?.map((feedback: { id: any; }) => {return <FeedbackList feedback={feedback}/>})
                }
            </table>
            <button className='return_button' onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
        </div>
    )
}

function FeedbackList({ feedback }: any) {
    const {id, feedback_rate, feedback_note, feedback_isNew, feedback_status, created} = feedback || {};

    return (
        <>
            <tbody>
                    <tr>
                        <td><button>{feedback_note}</button></td>
                        <td>{feedback_rate}</td>
                        <td>{created}</td>
                        <td>{feedback_status}</td>
                        <td><button>Update</button></td>
                        <td><button>Delete</button></td>
                    </tr>
            </tbody>
        </>     
    )
}