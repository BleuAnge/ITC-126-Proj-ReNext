'use client';

import './customer_support.css';
import { useState } from "react";
import Global_Modal from '../(modals)/modal';

export default function Customer_Support() {
    const [ ticket_type , setTicketType ] = useState(" ")
    const [ modal_show , setModalShow ] = useState(false)

    return (
        <>
            <div id="contact_screen">
                <div id="cards">
                    <div className="card_body" onClick={() => {
                        setModalShow(true)
                        setTicketType("Feedback")
                        }}>
                        <div className="card_content">
                            <h3 className="card_title">Send Feedback</h3>
                            <h5 className="card_subtitle">Tell us your Experience</h5>
                        </div>  
                    </div>

                    <div className="card_body" onClick={() => {
                        setModalShow(true)
                        setTicketType("Report")
                        }}>
                        <div className="card_content">
                            <h3 className="card_title">Report Issue</h3>
                            <h5 className="card_subtitle">Have any problem with the app? Come tell us!</h5>
                        </div>    
                    </div>

                    <div className="card_body" onClick={() => { 
                        setModalShow(true)
                        setTicketType("Application")
                        }}>
                        <div className="card_content">
                            <h3 className="card_title">Apply to Us</h3>
                            <h4 className="card_subtitle">Wanna work with Us? Come and apply Now!</h4>
                        </div>
                    </div>
                </div>
            </div>

            {
                modal_show ? (
                    <Global_Modal 
                        ticket_type = { ticket_type }
                        setModalShow = { setModalShow } 
                        />
                ) : (
                    null
                )
            }
        </>
    )
}