import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

export const Header = () => {
    return <header className={styles.header}>
        <div>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </div>
    </header>
}
