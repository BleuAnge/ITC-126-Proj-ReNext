import styles from './main_menu.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div id={styles.menu}>
        <div id={styles.menu_items}>
            <Link className={styles.menu_item} href='/'>Home</Link>
            <Link className={styles.menu_item} href='/Shop'>Shop</Link>
            <Link className={styles.menu_item} href='/About'>About Us</Link>
            <Link className={styles.menu_item} href='/ContactScreen'>Contact Us</Link>
        </div>
        <div id={styles.bg_pattern}></div>
        <div id={styles.bg_image}></div> 
    </div>
  );
}