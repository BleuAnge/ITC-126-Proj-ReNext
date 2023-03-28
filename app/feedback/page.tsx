import Link from "next/link";
import styles from './feedback.module.css';
import CreateFeedback from "./createFeedback";

async function getFeedbackTable() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/feedback_table/records?page=1&perPage=30',
    {cache:'no-store'});
    const data = await res.json();
    return data?.items as any[];
}

export default async function FeedbackAPI() {
    const feedbacks = await getFeedbackTable();

    return (
        <div>
            <h1>Feedback</h1>
            <div className={styles.grid}>
                {
                    feedbacks?.map((feedback) => {
                        return <Feedback key={feedback.id} feedback={feedback} />
                    })
                }
            </div>
        </div>
    )
}

function Feedback({ feedback }: any) {
    const {id, feedback_rate, feedback_note, created} = feedback || {};

    return (
        <Link href={`/feedback/${id}`}>
            <div className={styles.feedback}>
                <h2>{feedback_rate}</h2>
                <h5>{feedback_note}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}