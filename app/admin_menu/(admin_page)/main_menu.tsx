export default function MainMenu({setAdminMenu, setFeedbackMenu, setReportMenu, setApplyMenu, tickets}: any){
    const ShowFeedbackClick = () => {setAdminMenu(false); setFeedbackMenu(true)}
    const ShowReportClick = () => {setAdminMenu(false); setReportMenu(true)}
    const ShowApplyClick = () => {setAdminMenu(false); setApplyMenu(true)}

    return (
        <div className='admin-main-body'>
            <div className='admin-body-divider'>
                <div className='admin-ticket-container'>
                    {
                        tickets?.map((ticket: { id: any; }) => { return <Feedback key={ticket.id} ticket={ticket}/>})
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

function Feedback({ ticket }: any) {
    const {id, feedback_rate, feedback_note, created} = ticket || {};

    return (
        <button className='admin-section-card'>
            <h2>{feedback_rate}</h2>
            <h5>{feedback_note}</h5>
            <p>{created}</p>
        </button>
    )
}