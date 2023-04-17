import styles from './navbar.module.css';

export default function NavButton({ content }: any) {    

    return (
        <li className={styles.nav_item}>
            <a href={content.url} className={styles.title_btn}>
                {content.title}
            </a>
        </li>
    )
}