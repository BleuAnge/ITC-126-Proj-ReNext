'use client';

import './customer_support.css';
import { useState } from "react";
import Feedback_Modal from '../(modals)/feedback';
import Report_Modal from '../(modals)/report';
import Application_Modal from '../(modals)/application';

export default function Customer_Support() {
    const [showFeedbackModal, setFeedbackShow] = useState(false);
    const [showReportModal, setReportShow] = useState(false);
    const [showApplicationModal, setApplicationShow] = useState(false);

    return (
        <>
            <div id="contact_screen">
                <div id="cards">
                    <div className="card_body" onClick={() => setFeedbackShow(true)}>
                        <div className="card_content">
                            <h3 className="card_title">Send Feedback</h3>
                            <h5 className="card_subtitle">Tell us your Experience</h5>
                        </div>  
                    </div>

                    <div className="card_body" onClick={() => setReportShow(true)}>
                        <div className="card_content">
                            <h3 className="card_title">Report Issue</h3>
                            <h5 className="card_subtitle">Have any problem with the app? Come tell us!</h5>
                        </div>    
                    </div>

                    <div className="card_body" onClick={() => setApplicationShow(true)}>
                        <div className="card_content">
                            <h3 className="card_title">Apply to Us</h3>
                            <h4 className="card_subtitle">Wanna work with Us? Come and apply Now!</h4>
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

            {
                showReportModal ? (
                    <Report_Modal setReportShow={setReportShow} />
                ) : (
                    null
                )
            }

            {
                showApplicationModal ? (
                    <Application_Modal setApplicationShow={setApplicationShow} />
                ) : (
                    null
                )
            }
        </>
    )
}