import React from 'react';

import './Star.css'

const Star = ({
    className,
    rank
}) => {

    return (
        <div className={`star ${className || ''}`}>
            {rank && rank <= 5 && Array.apply(null, Array(rank)).map((star, index) => (
                <div key={index} className="filled" />
            ))}
            {rank && rank <= 5 ? Array.apply(null, Array(5 - rank)).map((star, index) => (
                <div key={index} className="empty" />
            )) : Array.apply(null, Array(5)).map((star, index) => (
                <div key={index} className="empty" />
            ))}
        </div>
    )
}

export default Star;