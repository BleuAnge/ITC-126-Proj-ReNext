'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import "../(utility)/modal.css";

function ReportModal({ setReportShow }) {
    const [report_sender, setReportSender] = useState(' ');
    const [report_type, setReportType] = useState(' ');
    const [order_id, setOrderID] = useState(' ');
    const [report_note, setReportNote] = useState(' ');
    const report_isNew = true;

    const router = useRouter();

    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/report_table/records', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                report_sender,
                order_id,
                report_note,
                report_type,
                report_isNew,
            }),
        });

        setReportSender(' ');
        setReportType(' ');
        setOrderID(' ');
        setReportNote(' ');
        router.refresh();
        setReportShow(false);
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Report Ticket</h1>
                    <button onClick={() => setReportShow(false)}> X </button>
                </div>
                <div className="modal_body">
                    <label for="reportSender">Report Sender: </label><br></br>
                    <input 
                        className="reportSender"
                        type="text" 
                        value={report_sender}
                        onChange={(e) => setReportSender(e.target.value)}
                    /><br></br>
                    <label for="reportType">Report Type:</label><br></br>
                    <select
                        className="reportType"
                        value={report_type}
                        onChange={(e)=> setReportType(e.target.value)}>
                        <option value="manage_reciept">Manage Receipt</option>
                        <option value="cancelled_order">Cancelled Order</option>
                        <option value="food_safety">Food Safety</option>
                        <option value="delivery_issue">Delivery Issue</option>
                        <option value="service_issue">Service Issue</option>    
                    </select><br></br><br></br>
                    <label for="orderID">Order ID: </label><br></br>
                    <input 
                        className="orderID"
                        type="text" 
                        value={order_id}
                        onChange={(e) => setOrderID(e.target.value)}
                    /><br></br>
                    <label for="reportNote">Report Note: </label><br></br>
                    <textarea
                        className="reportNote"
                        value={report_note}
                        onChange={(e) => setReportNote(e.target.value)}
                    />
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => setReportShow(false)}>Cancel</button>
                    <button onClick={create}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ReportModal