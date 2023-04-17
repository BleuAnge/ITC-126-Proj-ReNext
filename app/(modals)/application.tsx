'use client'

import { useState } from "react";
import { useGlobalState } from "../(utility)/save_state";
import "../(utility)/modal.css";

function Application_Modal({ setApplicationShow } : any) {
    const [currentUserData] = useState({
        username: useGlobalState("username").toString(),
        user_id: useGlobalState("userID").toString(),
    })
    const [first_name, setFirstName] = useState(' ');
    const [last_name, setLastName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [job_position, setJobPosition] = useState('product_manager');
    const application_status = "New";

    const sender = currentUserData.username.slice(0, currentUserData.username.length - 13)
    const sender_id = currentUserData.user_id.slice(0, currentUserData.user_id.length - 13)

    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/application_table/records', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                sender,
                sender_id,
                first_name,
                last_name,
                email,
                job_position,
                application_status,
            }),
        });

        setFirstName(' ');
        setLastName(' ');
        setEmail(' ');
        setJobPosition(' ');
        setApplicationShow(false);
    }

    return (
        <div className="modal_background">
            <div className="modal_container">
                <div className="modal_header">
                    <h1>Job Application Ticket</h1>
                    <button onClick={() => setApplicationShow(false)}> X </button>
                </div>
                <div className="modal_body">
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        className="firstName"
                        type="text" 
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    /><br></br><br></br>
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        className="lastName"
                        type="text" 
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    /><br></br><br></br>
                    <label htmlFor="email">Email: </label>
                    <input 
                        className="email"
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br></br><br></br>
                    <label htmlFor="jobPosition">Job Position: </label>
                    <select
                        className="jobPosition"
                        value={job_position}
                        onChange={(e)=> setJobPosition(e.target.value)}>
                        <option value="product_manager">Product Manager</option>
                        <option value="delivery_driver">Delivery Driver</option>
                        <option value="customer_support">Customer Support</option>
                        <option value="it_specialist">IT Specialist</option>  
                    </select><br></br><br></br>
                </div>
                <div className="modal_footer">
                    <button id="cancel_button" onClick={() => setApplicationShow(false)}>Cancel</button>
                    <button onClick={create}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Application_Modal