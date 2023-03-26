import styles from './navbar.module.css';
import { navItems } from './nav_list';
import NavItem from './nav_item';

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbar_nav}>
                {navItems.map((content, index) => {
                    return <NavItem content={content}/>
                })}
            </ul>
        </nav>
    )
}