'use client';

import styles from './customer_support.module.css';
import { useState } from "react";
import modalCSS from '../(utility)/modal.module.css';

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
                    <div className={modalCSS.modal_main}>
                        <div className={modalCSS.modal}>
                            <div className={modalCSS.modal_header}>
                                <div className={modalCSS.modal_text}>Feedback Form</div>
                            </div>
                            <div className={modalCSS.modal_body}><h1>Test</h1></div>
                            <div className={modalCSS.modal_footer}>
                                <button className={modalCSS.modal_close_button} onClick={() => setFeedbackShow(false)}>Close</button>
                                <button className={modalCSS.modal_save_button} onClick={() => setFeedbackShow(false)}>Save</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )
            }

            {
                showReportModal ? (
                    <div className={modalCSS.modal_main}>
                        <div className={modalCSS.modal}>
                            <div className={modalCSS.modal_header}>
                                <div className={modalCSS.modal_text}>Report Form</div>
                            </div>
                            <div className={modalCSS.modal_body}><h1>Test</h1></div>
                            <div className={modalCSS.modal_footer}>
                                <button className={modalCSS.modal_close_button} onClick={() => setReportShow(false)}>Close</button>
                                <button className={modalCSS.modal_save_button} onClick={() => setReportShow(false)}>Save</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )
            }

            {
                showApplicationModal ? (
                    <div className={modalCSS.modal_main}>
                        <div className={modalCSS.modal}>
                            <div className={modalCSS.modal_header}>
                                <div className={modalCSS.modal_text}>Application Form</div>
                            </div>
                            <div className={modalCSS.modal_body}><h1>Test</h1></div>
                            <div className={modalCSS.modal_footer}>
                                <button className={modalCSS.modal_close_button} onClick={() => setApplicationShow(false)}>Close</button>
                                <button className={modalCSS.modal_save_button} onClick={() => setApplicationShow(false)}>Save</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}