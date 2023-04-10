'use client';

import { useState } from 'react';
import './admin_page.css';

export default function AdminPage() {
    const [showAdminMenu, setAdminMenu] = useState(true);
    const [showFeedbackMenu, setFeedbackMenu] = useState(false);
    const [showReportMenu, setReportMenu] = useState(false);
    const [showApplyMenu, setApplyMenu] = useState(false);

    const ReturnToAdminMenu = () => {setAdminMenu(true); setFeedbackMenu(false); setReportMenu(false); setApplyMenu(false)}

    const ShowFeedbackClick = () => {setAdminMenu(false); setFeedbackMenu(true)}
    const ShowReportClick = () => {setAdminMenu(false); setReportMenu(true)}
    const ShowApplyClick = () => {setAdminMenu(false); setApplyMenu(true)}
    
    return (
        <>
            {
                showAdminMenu ?
                    <div className='admin-main-body'>
                        <div className='admin-body-divider'>
                            <div className='admin-ticket-container'>
                                
                            </div>
                            <div className='admin-menu-container'>
                                <button id='admin-feedback-section' className='admin-section-card' onClick={ShowFeedbackClick}>
                                    <h1 className='admin-menu-link'>Customer Feedback Tickets</h1>
                                </button>
                                <button id='admin-report-section' className='admin-section-card' onClick={ShowReportClick}>
                                    <h1 className='admin-menu-link'>Customer Report Tickets</h1>
                                </button>
                                <button id='admin-apply-section' className='admin-section-card' onClick={ShowApplyClick}>
                                    <h1 className='admin-menu-link'>Application Tickets</h1>
                                </button>
                            </div>
                        </div>
                        <div className='admin-image-section'>
                            <h1>image here</h1>
                        </div>
                    </div>
                : null
            }

            {
                showFeedbackMenu ?
                    <div>
                        <button onClick={ReturnToAdminMenu}>Back to Menu</button>
                        <h1>Test</h1>
                    </div>
                :null
            }

            {
                showReportMenu ?
                    <div>
                        <button onClick={ReturnToAdminMenu}>Back to Menu</button>
                        <h1>Test 2</h1>
                    </div>
                :null
            }

            {
                showApplyMenu ?
                    <div>
                        <button onClick={ReturnToAdminMenu}>Back to Menu</button>
                        <h1>Test 3</h1>
                    </div>
                :null
            }
        </>     
    )
}

