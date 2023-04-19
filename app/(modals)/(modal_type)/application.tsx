import { useState } from "react";

export default function Application_Modal({ 
    current_user_data,
    ticket_data, 
    setModalShow 
    } : any ) {
    
    const { 
            id,
            ticket_sender,
            ticket_sender_id,
            first_name, 
            last_name, 
            email, 
            job_position,
            application_status 
        } = ticket_data || {}

    const [ current_first_name, setFirstName ] = useState(
        first_name != undefined ?
            first_name : " " )

    const [ current_last_name, setLastName ] = useState(
        last_name != undefined ?
            last_name : " " )

    const [ current_email , setEmail ] = useState(
        email != undefined ?
            email : " " )

    const [ current_job_position, setJobPosition ] = useState(
        job_position != undefined ?
            job_position : "Product Manager" )

    const [ current_application_status, setApplicationStatus ] = useState(
        application_status != undefined ?
            application_status : "New" )

    const [ current_ticket_sender ] =  useState(
        ticket_sender != undefined ?
            ticket_sender : current_user_data.username )

    const [ current_ticket_sender_id ] = useState(
        ticket_sender_id != undefined ?
            ticket_sender_id : current_user_data.user_id )

    const db_url = "http://127.0.0.1:8090/api/collections/application_table/records"

    const create = async() => {
        const first_name = current_first_name
        const last_name = current_last_name
        const email = current_email
        const job_position = current_job_position
        const application_status = current_application_status
        const ticket_sender = current_ticket_sender
        const ticket_sender_id = current_ticket_sender_id

        await fetch(db_url, 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    ticket_sender,
                    ticket_sender_id,
                    first_name,
                    last_name,
                    email,
                    job_position,
                    application_status,
                }),
            }
        )

        setModalShow(false)
    }

    const update = async() => {
        const application_status = current_application_status

        await fetch(`http://127.0.0.1:8090/api/collections/application_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                application_status,
            }),
        });
    }

    return (
        <>
            <div className="modal_body">
                {
                    current_application_status != "New" ?
                        <>
                            <label htmlFor="feedback_sender">Feedback Sender: </label><br></br>
                            <input 
                                className="feedback_sender"
                                type="text" 
                                value={ current_ticket_sender }
                                readOnly
                            /><br></br><br></br>

                            <label htmlFor="feedback_sender_id">Feedback Sender ID: </label><br></br>
                            <input 
                                className="feedback_sender_id"
                                type="text" 
                                value={ current_ticket_sender_id}
                                readOnly
                            /><br></br><br></br>
                        </> 
                    : null
                }
                <label htmlFor="firstName">First Name: </label>
                <input 
                    className="firstName"
                    type="text" 
                    value={first_name}
                    onChange={(e) => { 
                        setFirstName(e.target.value)
                    }}/><br></br><br></br>

                <label htmlFor="lastName">Last Name: </label>
                <input 
                    className="lastName"
                    type="text" 
                    value={last_name}
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }}/><br></br><br></br>

                <label htmlFor="email">Email: </label>
                <input 
                    className="email"
                    type="text" 
                    value={current_email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}/><br></br><br></br>

                <label htmlFor="jobPosition">Job Position: </label>
                <select
                    className="jobPosition"
                    value={current_job_position}
                    onChange={(e)=> {
                        setJobPosition(e.target.value)
                        }}>
                    <option value="product_manager">Product Manager</option>
                    <option value="delivery_driver">Delivery Driver</option>
                    <option value="customer_support">Customer Support</option>
                    <option value="it_specialist">IT Specialist</option>  
                </select><br></br><br></br>
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