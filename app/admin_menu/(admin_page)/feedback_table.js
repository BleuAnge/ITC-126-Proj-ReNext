export default function FeedbackTable({setAdminMenu, setFeedbackMenu}) {
    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setFeedbackMenu(false);
    }

    return (
        <div>
            <button onClick={ReturnToAdminMenu}>Back to Menu</button>
            <h1>Test 32</h1>
        </div>
    )
}