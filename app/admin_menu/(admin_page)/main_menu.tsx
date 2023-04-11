export default function MainMenu({setAdminMenu, setFeedbackMenu, setReportMenu, setApplyMenu, tickets}: any){
    const ShowFeedbackClick = () => {setAdminMenu(false); setFeedbackMenu(true)}
    const ShowReportClick = () => {setAdminMenu(false); setReportMenu(true)}
    const ShowApplyClick = () => {setAdminMenu(false); setApplyMenu(true)}

    return (
        <div className='admin-main-body'>
            <div className='admin-body-divider'>
                <div className='admin-ticket-container'>
                    {
                        tickets?.map((ticket: { id: any; }) => { return <Feedback key={ticket.id} ticket={ticket} />})
                    }
                </div>
                <div className='admin-menu-container'>
                    <button id='admin-feedback-section' className='admin-section-card' onClick={ShowFeedbackClick}>
                        <h1 className='admin-menu-link'>Customer Feedback Tickets</h1>
                    </button>
                    <button id='admin-report-section' className='admin-section-card' onClick={ShowReportClick}>
                        <h1 className='admin-menu-link'>Customer Report Tickets</h1>
                    </button>
                    <button id='admin-apply-section' className='admin-section-card' onClick={ShowApplyClick}>
                        <h1 className='admin-menu-link'>Application Tickets</h1>
                    </button>
                </div>
            </div>
            <div className='admin-image-section'>
                <h1>image here</h1>
            </div>
        </div>
    )
}

//shows new ticket on admin main menu
//to be refactored
function Feedback({ ticket }: any) {
    const {id, feedback_rate, feedback_note, feedback_isNew, created} = ticket || {};

    const update = async () => {
        const feedback_isNew = false;

        await fetch(`http://127.0.0.1:8090/api/collections/feedback_table/records/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                feedback_isNew,
            }),
        })

        window.location.reload();
    }

    return (
        <>
            {
                feedback_isNew ? 
                    <button className='admin-section-card' onClick={update}>
                        <h2>{feedback_rate}</h2>
                        <p>{feedback_note}</p>
                        <p>{created}</p>
                    </button> 
                :null
            }
        </>     
    )
}