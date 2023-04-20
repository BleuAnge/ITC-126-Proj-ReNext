import { useState } from "react";
import Feedback_Modal from "./(modal_type)/feedback";
import Report_Modal from "./(modal_type)/report";
import Application_Modal from "./(modal_type)/application";
import Confirmation_Modal from "./(modal_type)/confirmation";
import "../(utility)/modal.css";

export default function Global_Modal({ 
    ticket_type , 
    ticket_data , 
    forDeletion,
    setModalShow 
    } : any) {

        console.log(ticket_type)

    return (
        <Modal_Ticket 
            setModalShow = { setModalShow } 
            ticket_type = { ticket_type } 
            ticket_data = { ticket_data } 
            forDeletion = { forDeletion } />
    )
}

function Modal_Ticket({ 
    ticket_data,  
    ticket_type, 
    setModalShow,
    forDeletion 
    } : any) {

    const [ current_user_data ] = useState<any>(
        JSON.parse(localStorage.getItem("CURRENT_USER_DATA") || " " ))
    
    return (
        <div className='modal_background'>
            <div className='modal_container'>
                <div className='modal_header'>
                    <h1> 
                        { ticket_type } Ticket
                    </h1>
                    <button onClick={() => setModalShow(false)}> 
                        X 
                    </button>
                </div>
                {
                    !forDeletion ? 
                        ticket_type === "Feedback" ? (
                            <Feedback_Modal 
                                current_user_data = { current_user_data }
                                ticket_data = { ticket_data } 
                                setModalShow = { setModalShow } /> ) :
                        ticket_type === "Report" ? (
                            <Report_Modal 
                                current_user_data = { current_user_data }
                                ticket_data = { ticket_data } 
                                setModalShow = { setModalShow } /> ) :
                            <Application_Modal 
                                current_user_data = { current_user_data }
                                ticket_data = { ticket_data } 
                                setModalShow = { setModalShow } /> 
                    : (
                        <Confirmation_Modal
                            ticket_type = { ticket_type }
                            ticket_data = { ticket_data } 
                            setModalShow = { setModalShow } /> ) 
                } 
            </div>
        </div>
    )
}