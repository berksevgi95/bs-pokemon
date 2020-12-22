import React from 'react'
import { withRouter } from 'react-router'

import './styles.css'

const Card = ({
    data,
    onClick,
    history,
    ...props
}) => {
    return (
        <div className="card-container">
            <div
                className="card"
                onClick={() => {
                    if (onClick)
                        onClick()
                    setTimeout(() => {
                        history.push('/my-pokemons')
                    }, 500)
                }}
            >
                aklsjdlaksjd
            </div>
        </div>
    )
}

export default withRouter(Card);