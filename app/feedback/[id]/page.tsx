import styles from '../feedback.module.css';

async function getFeedback(feedbackID: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${feedbackID}`);
    const data = await res.json();
    return data;
}

export default async function FeedbackPage({ params }: any) {
    const feedback = await getFeedback(params.id);

    return (
        <div>
            <h1>Feedback/{feedback.id}</h1>
            <div className={styles.grid}>
                <div className={styles.feedback}>
                    <h2>{feedback.feedback_rate}</h2>
                    <h5>{feedback.feedback_note}</h5>
                    <p>{feedback.created}</p>
                </div>
            </div>
        </div>
    )
}