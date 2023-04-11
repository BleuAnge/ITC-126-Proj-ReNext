export default function ApplicationTable({setAdminMenu, setApplyMenu}) {
    const ReturnToAdminMenu = () => {
        setAdminMenu(true); 
        setApplyMenu(false);
    }

    return (
        <div>
            <button onClick={ReturnToAdminMenu}>Back to Menu</button>
            <h1>Test 69</h1>
        </div>
    )
}