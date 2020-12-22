import React from 'react'

import './styles.css'

const Main = ({
    children
}) => {
    return (
        <main className="main">
            {children}
        </main>
    )
}

export default Main;