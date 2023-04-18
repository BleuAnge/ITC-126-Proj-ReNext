'use client';

import { useState, useEffect } from 'react'
import './footer.css';

export default function Footer({currentUserData}:any) {
    const { username, usertype } = currentUserData || {}

    return (
        <footer className='footer_bar'>
            <div className='footer_status_bar'>
                <h1 className='current_user'>Current User: { username }</h1>
                <h1 className='current_usertype'>Current Usertype: { usertype }</h1>
            </div>
        </footer>
    )
}