export default function ReportTable({setAdminMenu, setReportMenu}) {
    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setReportMenu(false);
    }

    return (
        <div>
            <button onClick={ReturnToAdminMenu}>Back to Menu</button>
            <h1>Test 25</h1>
        </div>
    )
}