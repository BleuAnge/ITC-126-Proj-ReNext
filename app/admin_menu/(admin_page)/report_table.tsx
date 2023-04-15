import { useEffect, useState } from 'react';
import '../../(utility)/modal.css';

export default function ReportTable({setAdminMenu, setReportMenu}: any) {
    const [reports, setReport] = useState<any>()
    
    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setReportMenu(false);
    }

    useEffect(() => {
        async function getReportTable() {
            const res = await fetch('http://127.0.0.1:8090/api/collections/report_table/records?page=1&perPage=30',
            {cache:'no-store'});
            const data = await res.json();
            setReport(data?.items);
            return data?.items as any[];
        }

        getReportTable(); 
    },[])

    return (
        <div>
            <h1>Feedback Table</h1>
            <button onClick={ReturnToAdminMenu}>Return to Admin Menu</button>
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
                    reports?.map((report: { id: any; }) => {return <ReportList report={report}/>})
                }
                
            </table>
        </div>
    )
}

function ReportList({ report }: any) {
    const {report_sender, report_note, report_type, report_status, created} = report || {};

    return (
        <>
            <tbody>
                    <tr>
                        <td>{report_sender}</td>
                        <td>{report_note}</td>
                        <td>{report_type}</td>
                        <td>{created}</td>
                        <td>{report_status}</td>
                        <td><button>Update</button></td>
                        <td><button>Delete</button></td>
                    </tr>
            </tbody>
        </>     
    )
}