import React from "react";
import styles from "../(utility)/modal.module.css";

function Feedback_Modal({ setFeedbackShow }) {
    return (
        <div className={styles.modal_background}>
            <div className={styles.modal_container}>
                <div className={styles.modal_header}>
                    <h1>Feedback Ticket</h1>
                    <button onClick={() => setFeedbackShow(false)}> X </button>
                </div>
                <div className={styles.modal_body}><p>test Modal Body</p></div>
                <div className={styles.modal_footer}>
                    <button id={styles.cancel_button} onClick={() => setFeedbackShow(false)}>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Feedback_Modal