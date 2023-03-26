'use client';

import { useState } from "react";
import Link from 'next/link';
import DropDown from "../(utility)/dropdown";
import styles from "./navbar.module.css";

export default function NavDropDown({ items }) {
    const [dropDown, setDropDown] = useState(false);

    return (
        <li className={styles.nav_item}>
            {items.subMenu ? (
                <>
                    <button type="button" aria-expanded={dropDown ? "true" : "false"} onClick={() => setDropDown((prev) => !prev)}>
                        {items.title}{" "}
                    </button>
                    <DropDown submenus={items.subMenu} dropdown={dropDown}/>
                </>
            ) : (
                <a href={items.url}>{items.title}</a>
            )}
        </li>
    )
}