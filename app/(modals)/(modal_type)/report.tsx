import { useState , useEffect } from "react"

export default function Report_Modal({ 
    current_user_data,
    ticket_data, 
    setModalShow 
    } : any ) {

    const { 
            id,
            ticket_sender,
            ticket_sender_id,
            report_type, 
            order_id, 
            report_note, 
            report_status, 
            assigned_to, 
            assigned_to_id 
        } = ticket_data || {}

    const [ current_order_id, setOrderID ] = useState(
        order_id != undefined ?
            order_id : " " )

    const [ current_report_type , setReportType ] = useState(
        report_type != undefined ?
            report_type : " " )  
    
    const [ current_report_note , setReportNote ] = useState(
        report_note != undefined ?
            report_note : " " )
    
    const [ current_report_status , setReportStatus ] = useState(
        report_status == "New" ? "Seen"
        : report_status != undefined ? 
            report_status : "New" )

    const [ current_assigned_to, setAssigned_To ] = useState(
        assigned_to != undefined ? 
        assigned_to : "Grant Maneetapho" )

    const [ current_assigned_to_id, setAssigned_To_ID ] = useState(
        assigned_to_id != undefined ? 
        assigned_to_id : " " )

    const [ current_ticket_sender ] =  useState(
        ticket_sender != undefined ?
            ticket_sender : current_user_data.username )

    const [ current_ticket_sender_id ] = useState(
        ticket_sender_id != undefined ?
            ticket_sender_id : current_user_data.user_id )

    const [account_list, setAccountList ] = useState<any>()

    const db_url = "http://127.0.0.1:8090/api/collections/report_table/records"

    current_user_data.usertype === "ADMIN" ? 
     
        useEffect(() => {
            async function getAccountList() {
                const res = await fetch(`http://127.0.0.1:8090/api/collections/account_table/records?page=1&perPage=30`, {cache:'no-store'})
                const data = await res.json()
                setAccountList(data?.items)
            }

            getAccountList(); 
        },[])
    : null

    const create = async () => {
        const ticket_sender = current_ticket_sender
        const ticket_sender_id = current_ticket_sender_id
        const order_id = current_order_id
        const report_type = current_report_type
        const report_note = current_report_note
        const report_status = current_report_status
        
        await fetch(db_url, 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    ticket_sender,
                    ticket_sender_id,
                    order_id,
                    report_type,
                    report_note,
                    report_status,
                }),
            }
        )

        setModalShow(false)
    }

    const updateSeen = async() => {
        const report_status = current_report_status

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
            }),
        });

        location.reload()
    }

    const updateAssigned = async() => {
        const report_status = current_report_status
        const assigned_to = current_assigned_to
        const assigned_to_id = current_assigned_to_id

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
                assigned_to,
                assigned_to_id,
            }),
        });

        location.reload()
    }

    const updateApproved = async() => {
        const report_status = current_report_status

        await fetch(`http://127.0.0.1:8090/api/collections/report_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_status,
            }),
        });

        location.reload()
    }

    return (
       <>
            <div className="modal_body">
                <label htmlFor="reportSender">Report Sender: </label><br></br>
                <input 
                    className="reportSender"
                    type="text" 
                    value={current_ticket_sender}
                    readOnly /><br></br>

                <label htmlFor="reportType">Report Type:</label><br></br>
                <select
                    disabled = { current_report_status != "New" ? true : false }
                    className="reportType"
                    value={ current_report_type }
                    onChange={(e)=> {
                        setReportType(e.target.value)
                        }}>
                    <option value="Manage Reciept">Manage Receipt</option>
                    <option value="Cancelled Order">Cancelled Order</option>
                    <option value="Food Safety">Food Safety</option>
                    <option value="Delivery Status">Delivery Issue</option>
                    <option value="Service Issue">Service Issue</option>    
                </select><br></br><br></br>

                <label htmlFor="orderID">Order ID: </label><br></br>
                <input 
                    className="orderID"
                    type="text" 
                    value={current_order_id}
                    onChange={(e) => {
                        setOrderID(e.target.value)
                    }}
                    readOnly = { current_report_status != "New" ? true : false }
                    /><br></br>
                
                <label htmlFor="reportNote">Report Note: </label><br></br>
                <textarea
                    className="reportNote"
                    value={current_report_note}
                    onChange={(e) => {
                        setReportNote(e.target.value)
                    }}
                    readOnly = { current_report_status != "New" ? true : false }
                    />
                {
                    current_user_data.usertype === "ADMIN" ?
                        <>
                            <label htmlFor="assign_to">Assign Ticket To:</label><br></br>
                            <select
                                disabled = { report_status == "Processing"  ? true : false } 
                                className = "reportType"
                                value = { current_assigned_to_id }
                                onChange={(e)=>{ 
                                    setAssigned_To_ID(e.target.value)
                                    setAssigned_To(e.target.options[e.target.selectedIndex].text)
                                    setReportStatus("Processing")
                                    }}>
                                        {
                                            account_list?.map((account: {id: any}) => {
                                                return (
                                                    <GetAccounts account={account} />
                                                )
                                            })
                                        }    
                            </select><br></br><br></br>
                        </>
                    : null
                }
                
                {
                    current_report_status === "Waiting for Approval" && report_status != "Approved"? 
                        <button onClick={() => setReportStatus("Approved")}>Approve Ticket</button>
                    : null
                }
            </div>
            <div className="modal_footer">
                <button id="cancel_button" onClick={() => {
                    setModalShow(false)
                    {
                        current_user_data.usertype === "ADMIN" && 
                        report_status != "Waiting for Approval" && 
                        report_status != "Approved"?
                            updateSeen()
                        : null
                    }
                    }}>
                        Cancel
                </button>
                <button onClick={() => {
                    current_report_status === "New" ? 
                        create()
                    : report_status != "Waiting for Approval" && 
                      report_status != "Approved" ?
                        updateAssigned()
                    : report_status != "Approved" ? 
                        updateApproved()
                    : null
                    }}>
                        Save
                </button>
            </div>
       </>
    )

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
}