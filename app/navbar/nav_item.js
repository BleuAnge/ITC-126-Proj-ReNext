'use client';

import styles from './navbar.module.css';
import { useState } from 'react';
import DropDown from '../(utility)/dropdown';

export default function NavItem({ content }) {
    const [open, setOpen] = useState(false);

    return (
        <li className={styles.nav_item}>
            {
                content.subMenu ? (
                    <>
                        <a href={content.url} className={styles.title_btn} onClick={() => setOpen(!open)}>
                            {content.title}
                        </a>

                        {open && <DropDown submenus={content.subMenu}/>}
                    </>
                ) : (
                    <a href={content.url} className={styles.title_btn} onClick={() => setOpen(!open)}>
                        {content.title}
                    </a>
                )
            }    
        </li>
    )
}