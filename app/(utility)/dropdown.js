import styles from '../navbar/navbar.module.css';

export default function DropDown({ submenus, dropdown }) {
    return (
        <ul className={dropdown ? styles.dropdown.show : styles.dropdown}>
            {
                submenus.map((submenu, index) => (
                    <li key={index} className={styles.nav_item}>
                        <a href={submenu.url}>{submenu.title}</a>
                    </li>
            ))}
        </ul>
    )
}