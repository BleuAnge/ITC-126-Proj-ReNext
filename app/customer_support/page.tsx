'use client';

import styles from './customer_support.module.css';
import { useState } from "react";
import modalCSS from '../(utility)/modal.module.css';
import Feedback_Modal from '../(modals)/feedback';

export default function Customer_Support() {
    const [showFeedbackModal, setFeedbackShow] = useState(false);
    const [showReportModal, setReportShow] = useState(false);
    const [showApplicationModal, setApplicationShow] = useState(false);

    return (
        <>
            <div id={styles.contact_screen}>
                <div id={styles.cards}>
                    <div className={styles.card_body} onClick={() => setFeedbackShow(true)}>
                        <div className={styles.card_content}>
                            <h3 className={styles.card_title}>Send Feedback</h3>
                            <h5 className={styles.card_subtitle}>Tell us your Experience</h5>
                        </div>  
                    </div>

                    <div className={styles.card_body} onClick={() => setReportShow(true)}>
                        <div className={styles.card_content}>
                            <h3 className={styles.card_title}>Report Issue</h3>
                            <h5 className={styles.card_subtitle}>Have any problem with the app? Come tell us!</h5>
                        </div>    
                    </div>

                    <div className={styles.card_body} onClick={() => setApplicationShow(true)}>
                        <div className={styles.card_content}>
                            <h3 className={styles.card_title}>Apply to Us</h3>
                            <h4 className={styles.card_subtitle}>Wanna work with Us? Come and apply Now!</h4>
                        </div>
                    </div>
                </div>
            </div>

            {
                showFeedbackModal ? (
                    <Feedback_Modal setFeedbackShow={setFeedbackShow} />
                ) : (
                    null
                )
            }
        </>
    )
}