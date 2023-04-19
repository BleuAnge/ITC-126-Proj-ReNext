import { useState } from "react"

export default function Report_Modal({ 
    current_user_data,
    ticket_data, 
    setModalShow 
    } : any ) {

    const { 
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
        report_status != undefined ? 
            report_status : "New" )

    const ticket_sender = current_user_data.username
    const ticket_sender_id = current_user_data.user_id

    const db_url = "http://127.0.0.1:8090/api/collections/report_table/records"

    const create = async () => {
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

    return (
       <>
            <div className="modal_body">
                <label htmlFor="reportSender">Report Sender: </label><br></br>
                <input 
                    className="reportSender"
                    type="text" 
                    value={ticket_sender}
                    readOnly /><br></br>

                <label htmlFor="reportType">Report Type:</label><br></br>
                <select
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
                    }}/><br></br>
                
                <label htmlFor="reportNote">Report Note: </label><br></br>
                <textarea
                    className="reportNote"
                    value={current_report_note}
                    onChange={(e) => {
                        setReportNote(e.target.value)
                    }}/>
            </div>
            <div className="modal_footer">
                <button id="cancel_button" onClick={() => {
                    setModalShow(false)
                    }}>
                        Cancel
                </button>
                <button onClick={() => {
                    create()
                    }}>
                        Save
                </button>
            </div>
       </>
    )
}