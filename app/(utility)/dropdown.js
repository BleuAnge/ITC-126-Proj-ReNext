import styles from '../navbar/navbar.module.css';

export default function DropDown({submenus}) {
    return (
        <div className={styles.dropdown}>
            {submenus.map((submenu) => (
                <a href={submenu.url} className={styles.menu_item}>{submenu.title}</a>
            ))}
        </div>
    )
}