import Link from 'next/link';
import '../../(utility)/modal.css';

async function getFeedback(feedbackID: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${feedbackID}`);
    const data = await res.json();
    return data;
}

export default async function FeedbackPage({ params, setModalShow }: any) {
    const feedback = await getFeedback(params.id);

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Feedback Ticket</h1>
                    <Link className="exit_button" href={`/admin_menu`}> X </Link>
                </div>
                <div className="modal_body">
                    <label htmlFor="feedbackrate">Feedback Rate: </label><br></br>
                    <input 
                        className="feedbackrate"
                        type="number" 
                        value={feedback.feedback_rate}
                        readOnly
                    /><br></br><br></br>
                    <label htmlFor="feedbackrate">Feedback Note: </label><br></br>
                    <textarea
                        value={feedback.feedback_note}
                        readOnly
                    />
                </div>
                <div className="modal_footer">
                    <button id="cancel_button">Cancel</button>
                    <button >Save</button>
                </div>
            </div>
        </div>
    )
}