'use client';

import { useEffect, useState } from 'react';
import '../(utility)/modal.css';
import '../(utility)/table.css';

export default function ReportTable() {
    const [reports, setReport] = useState<any>()
    const [showModal, setModalShow] = useState(false)
    const [reportID, setReportID] = useState()
    const [currentUserData, setCurrentUserData] = useState<any>(JSON.parse(localStorage.getItem('CURRENT_USER_DATA') || ''))
    const [id, setID] = useState()

    const baseUrl = 'http://127.0.0.1:8090/api/collections/report_table/records?page=1&perPage=30'
    
    useEffect(() => {
        setCurrentUserData(JSON.parse(localStorage.getItem('CURRENT_USER_DATA') || ''))
        
        async function getReportTable() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setReport(data?.items);
        }

        getReportTable(); 
    },[])

    useEffect(() => {
        const { id } = currentUserData || {}
        setID(id)
        console.log(id)
    }, [currentUserData])

    return (
        <>
            <div className='main_div'>
                <h1 className='table_title'>Report Table</h1>
                <div className='table_container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Report Note</th>
                                <th>Report Type</th>
                                <th>Date Sent</th>
                                <th>Report Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        {
                            reports?.map((report: { id: any; }) => { return (
                                <>
                                    <ReportList 
                                        report={report} 
                                        id = { id }
                                        setReportID={setReportID} 
                                        setModalShow={setModalShow} />
                                </>
                            )})
                        } 
                    </table>
                </div>   
            </div>
            {
                showModal ?
                    <ReportTicket reportID={reportID} setModalShow={setModalShow} />
                : null
            }
        </>
    )
}

function ReportList({ report, id, setReportID, setModalShow, deleteTicket }: any) {
    const {sender, report_note, report_type, report_status, created, assigned_to_ID} = report || {};
    console.log(id)
    return (
        <>
            {
                assigned_to_ID === id ? 
                <tbody>
                    <tr>
                        <td>{sender}</td>
                        <td>{report_note}</td>
                        <td>{report_type}</td>
                        <td>{created}</td>
                        <td>{report_status}</td>     
                        <td><button className='button_clear' onClick={() => {
                            setReportID(report.id)
                            setModalShow(true)
                        }}>
                            Update
                        </button></td>
                    </tr>
                </tbody>
                : null
            }
        </>     
    )
}

function ReportTicket({ reportID, setModalShow }: any) {
    const [reportData, setReportData] = useState<any>()
    const [report_status] = useState("Waiting for Approval")
    const [isDone, setIsDone] = useState(false)
    
    useEffect(() => {
        async function getReportTable() {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`)
            const data = await res.json()
            setReportData(data)
        }

        getReportTable(); 
    },[])

    const {report_sender, order_id, report_note, report_type} = reportData || {}

    const update = async() => {
        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
            }),
        });

        window.location.reload()
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Report Ticket</h1>
                    <button onClick={() => {
                        setModalShow(false)
                        update()
                    }}> 
                        X 
                    </button>
                </div>
                <div className="modal_body">
                <label htmlFor="reportSender">Report Sender: </label><br></br>
                    <input 
                        className="reportSender"
                        type="text" 
                        value={report_sender}
                        readOnly
                    /><br></br>
                    <label htmlFor="reportType">Report Type:</label><br></br>
                    <input
                        className="reportType"
                        type="text" 
                        value={report_type}
                        readOnly 
                    /><br></br><br></br>
                    <label htmlFor="orderID">Order ID: </label><br></br>
                    <input 
                        className="orderID"
                        type="text" 
                        value={order_id}
                        readOnly
                    /><br></br>
                    <label htmlFor="reportNote">Report Note: </label><br></br>
                    <textarea
                        className="reportNote"
                        value={report_note}
                        readOnly
                    />
                    <button onClick={() => setIsDone(true)}>
                        Finish Report
                    </button>
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => {
                        setModalShow(false)
                    }}>
                        Cancel
                    </button>
                    <button onClick={() => {
                        setModalShow(false)
                        isDone ? update() : null
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}