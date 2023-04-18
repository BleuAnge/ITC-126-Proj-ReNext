import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';
import '../../(utility)/table.css';

export default function ReportTable({setAdminMenu, setReportMenu}: any) {
    const [reports, setReport] = useState<any>()
    const [showModal, setModalShow] = useState(false)
    const [reportID, setReportID] = useState()
    
    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setReportMenu(false);
    }

    const baseUrl = 'http://127.0.0.1:8090/api/collections/report_table/records?page=1&perPage=30'

    useEffect(() => {
        async function getReportTable() {
            const res = await fetch(baseUrl,
            {cache:'no-store'});
            const data = await res.json();
            setReport(data?.items);
        }

        getReportTable(); 
    },[])

    const deleteTicket = async () => {
        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`, {
            method: 'Delete',
        })
    }

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
                                <th></th>
                            </tr>
                        </thead>
                        {
                            reports?.map((report: { id: any; }) => { 
                                return (
                                    <tbody>
                                        <tr>
                                            <ReportList report={report}/>
                                            <td><button className='button_clear' onClick={() => {
                                                setReportID(report.id)
                                                setModalShow(true)
                                            }}>
                                                Update
                                            </button></td>
                                            <td><button className='button_clear' onClick={() => {
                                                setReportID(report.id)
                                                deleteTicket()
                                            }}>
                                                Delete
                                            </button></td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        } 
                    </table>
                </div>   
                <button className='return_button' onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
            </div>
            {
                showModal ?
                    <ReportTicket reportID={reportID} setModalShow={setModalShow} />
                : null
            }
        </>
    )
}

function ReportList({ report }: any) {
    const {sender, report_note, report_type, report_status, created} = report || {};

    return (
        <>
            <td>{sender}</td>
            <td>{report_note}</td>
            <td>{report_type}</td>
            <td>{created}</td>
            <td>{report_status}</td>     
        </>     
    )
}

function ReportTicket({ reportID, setModalShow }: any) {
    const [reportData, setReportData] = useState<any>()
    const [accounts, setAccounts] = useState<any>()
    const [current_report_status, setReportStatus] = useState<any>("Seen")
    const [assigned_to, setAssigned_To] = useState<any>("Grant Maneetapho")
    const [current_assigned_to_ID, setAssigned_To_ID] = useState<any>()
    
    useEffect(() => {
        async function getReportTable() {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`)
            const data = await res.json()
            setReportData(data)
        }

        async function getAccountTable() {
            const res = await fetch(`http://127.0.0.1:8090/api/collections/account_table/records?page=1&perPage=30`, {cache:'no-store'})
            const data = await res.json()
            setAccounts(data?.items)
        }

        getReportTable();
        getAccountTable(); 
    },[])

    const { sender, order_id, report_note, report_type, report_status , assigned_to_ID} = reportData || {}
    
    const updateSeen = async() => {
        const report_status = current_report_status

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
            }),
        });
    }

    const updateAssigned = async() => {
        const report_status = current_report_status
        const assigned_to_ID = current_assigned_to_ID

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
                assigned_to,
                assigned_to_ID,
            }),
        });
    }

    const updateApproved = async() => {
        const report_status = current_report_status

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${reportID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
            }),
        });
    }


    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Report Ticket</h1>
                    <button onClick={() => {
                        setModalShow(false)
                        updateSeen()
                    }}> 
                        X 
                    </button>
                </div>
                <div className="modal_body">
                <label htmlFor="reportSender">Report Sender: </label><br></br>
                    <input 
                        className="reportSender"
                        type="text" 
                        value={sender}
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
                    /><br></br>
                    <label htmlFor="assign_to">Assign Ticket To:</label><br></br>
                    <select
                        disabled={report_status != "Waiting for Approval" ? false : true}
                        className="reportType"
                        value={report_status != "Waiting for Approval" ? current_assigned_to_ID : assigned_to_ID}
                        onChange={(e)=>{ 
                            setAssigned_To_ID(e.target.value)
                            setAssigned_To(e.target.options[e.target.selectedIndex].text)
                            setReportStatus("Processing")
                            }}>
                                {
                                    accounts?.map((account: {id: any}) => {
                                        return (
                                            <GetAccounts account={account} />
                                        )
                                    })
                                }    
                    </select><br></br><br></br>
                    {
                        report_status == "Waiting for Approval" ? 
                            <button onClick={() => setReportStatus("Approved")}>Approve Ticket</button>
                        : null
                    }
                    
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => {
                        setModalShow(false)
                        {
                            report_status != "Waiting for Approval" ?
                                updateSeen()
                            : null
                        }
                        
                    }}>
                        Cancel
                    </button>
                    <button onClick={() => {
                        setModalShow(false)
                        {
                            report_status != "Waiting for Approval" ?
                                updateAssigned()
                            : updateApproved()
                        }
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

function GetAccounts({ account }: any) {
    const {id, username, usertype} = account || {}

    return (
        <>
            {
                usertype == "IT" ? 
                    <option value={id}>{username}</option>
                : usertype == "PARTNER" ?
                    <option value={id}>{username}</option>
                : null
            }
        </>
    )
}