'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import "../(utility)/modal.css";

function Application_Modal({ setApplicationShow }) {
    const [first_name, setFirstName] = useState(' ');
    const [last_name, setLastName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [job_position, setJobPosition] = useState(' ');
    const application_isNew = true;

    const router = useRouter();

    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/application_table/records', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                job_position,
                application_isNew,
            }),
        });

        setFirstName(' ');
        setLastName(' ');
        setEmail(' ');
        setJobPosition(' ');
        router.refresh();
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
                    <label for="firstName">First Name: </label>
                    <input 
                        className="firstName"
                        type="text" 
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    /><br></br><br></br>
                    <label for="lastName">Last Name: </label>
                    <input 
                        className="lastName"
                        type="text" 
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    /><br></br><br></br>
                    <label for="email">Email: </label>
                    <input 
                        className="email"
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br></br><br></br>
                    <label for="jobPosition">Job Position: </label>
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