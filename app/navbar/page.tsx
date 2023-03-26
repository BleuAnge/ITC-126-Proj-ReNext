import styles from './navbar.module.css';
import { Nav_Items } from './nav_items';
import NavDropList from './nav_dropdown';

export default function Navbar() {
    return (
        <header>
            <div className='nav_area'>
                <nav>
                    <ul className={styles.menu}>
                        { Nav_Items.map((menu, index) => {
                            return <NavDropList items={menu} key={index}/>;
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}