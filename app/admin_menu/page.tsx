'use client';

import Link from 'next/link';
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
                                <h1>new ticket here</h1>
                            </div>
                            <div className='admin-menu-container'>
                                <div id='admin-feedback-section' className='admin-section-card' onClick={ShowFeedbackClick}>
                                    <h1 className='admin-menu-link'>Customer Feedback Tickets</h1>
                                </div>
                                <div id='admin-report-section' className='admin-section-card' onClick={ShowReportClick}>
                                    <h1 className='admin-menu-link'>Customer Report Tickets</h1>
                                </div>
                                <div id='admin-apply-section' className='admin-section-card' onClick={ShowApplyClick}>
                                    <h1 className='admin-menu-link'>Application Tickets</h1>
                                </div>
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
                        <Link className='admin-menu-link' onClick={ReturnToAdminMenu}>Customer Feedback Tickets</Link>
                    </div>
                :null
            }

            {
                showReportMenu ?
                    <div>
                        <Link className='admin-menu-link' onClick={ReturnToAdminMenu}>Customer Feedback Tickets</Link>
                    </div>
                :null
            }

            {
                showApplyMenu ?
                    <div>
                        <Link className='admin-menu-link' onClick={ReturnToAdminMenu}>Customer Feedback Tickets</Link>
                    </div>
                :null
            }
        </>     
    )
}