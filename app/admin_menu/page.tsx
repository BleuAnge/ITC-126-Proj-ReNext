'use client';

import { useState, useEffect } from 'react';
import MainMenu from './(admin_page)/main_menu';
import FeedbackTable from './(admin_page)/feedback_table';
import ReportTable from './(admin_page)/report_table';
import ApplicationTable from './(admin_page)/application_table';
import './admin_page.css';

export default function AdminPage() {
    const [showAdminMenu, setAdminMenu] = useState(true);
    const [showFeedbackMenu, setFeedbackMenu] = useState(false);
    const [showReportMenu, setReportMenu] = useState(false);
    const [showApplyMenu, setApplyMenu] = useState(false);

    const [tickets, setTickets] = useState();

    useEffect(() => {
        async function getFeedbackTable() {
            const res = await fetch('http://127.0.0.1:8090/api/collections/feedback_table/records?page=1&perPage=30',
            {cache:'no-store'});
            const data = await res.json();
            setTickets(data?.items);
            return data?.items as any[];
        }

        getFeedbackTable(); 
    },[])

    console.log(tickets);
    
    return (
        <>
            {
                showAdminMenu ?
                    <MainMenu 
                        setAdminMenu={setAdminMenu} 
                        setFeedbackMenu={setFeedbackMenu} 
                        setReportMenu={setReportMenu} 
                        setApplyMenu={setApplyMenu}
                        tickets={tickets}/>
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

