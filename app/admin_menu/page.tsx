'use client';

import { useState, useEffect } from 'react';
import MainMenu from './(admin_page)/main_menu';
import FeedbackTable from './(admin_page)/feedback_table';
import ReportTable from './(admin_page)/report_table';
import ApplicationTable from './(admin_page)/application_table';
import './admin_page.css';

export default function AdminPage() {
    const [showAdminMenu, setAdminMenu] = useState(JSON.parse(localStorage.getItem('CURRENT_ADMIN_STATE') || 'true'));
    const [showFeedbackMenu, setFeedbackMenu] = useState(JSON.parse(localStorage.getItem('CURRENT_FEEDBACK_STATE') || 'false'));
    const [showReportMenu, setReportMenu] = useState(JSON.parse(localStorage.getItem('CURRENT_REPORT_STATE') || 'false'));
    const [showApplyMenu, setApplyMenu] = useState(JSON.parse(localStorage.getItem('CURRENT_APPLY_STATE') || 'false'));

    useEffect(() => {
        localStorage.setItem('CURRENT_ADMIN_STATE', JSON.stringify( showAdminMenu ))
        localStorage.setItem('CURRENT_FEEDBACK_STATE', JSON.stringify( showFeedbackMenu ))
        localStorage.setItem('CURRENT_REPORT_STATE', JSON.stringify( showReportMenu ))
        localStorage.setItem('CURRENT_APPLY_STATE', JSON.stringify( showApplyMenu ))
    }, [showAdminMenu, showFeedbackMenu, showReportMenu, showApplyMenu])
    
    return (
        <>
            {
                showAdminMenu ?
                    <MainMenu 
                        setAdminMenu={setAdminMenu} 
                        setFeedbackMenu={setFeedbackMenu} 
                        setReportMenu={setReportMenu} 
                        setApplyMenu={setApplyMenu} />
                : null
            }

            {
                showFeedbackMenu ?
                    <FeedbackTable 
                        setAdminMenu={setAdminMenu}
                        setFeedbackMenu={setFeedbackMenu}/>
                :null
            }

            {
                showReportMenu ?
                    <ReportTable
                        setAdminMenu={setAdminMenu}
                        setReportMenu={setReportMenu}/>
                :null
            }

            {
                showApplyMenu ?
                    <ApplicationTable
                        setAdminMenu={setAdminMenu}
                        setApplyMenu={setApplyMenu}/>
                :null
            }
        </>     
    )
}

