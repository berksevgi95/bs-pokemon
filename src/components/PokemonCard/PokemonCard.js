import React from 'react'
import Axios from '../../utils/axios'

import './styles.css'


const Card = ({
    pokemon,
    onClick,
    history,
    ...props
}) => {

    const [loading, setLoading] = React.useState(false)
    const [detail, setDetail] = React.useState(null)

    React.useEffect(() => {
        setLoading(true)
        Axios.get(pokemon.url)
            .then((result) => {
                setDetail(result.data)
                setLoading(false)
            })
    }, [])


    const handleOnClick = () => {
        if (onClick)
            onClick(detail)
    }

    return (
        <div className="card-container">
            <div className="card">
                {loading && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'white',
                        borderRadius: 25,
                    }}>
                        Loading
                    </div>
                )}
                {!detail ? (
                    <div>Error</div>
                ) : (
                    <div
                        onClick={handleOnClick}
                        className="card-content"
                    >
                        <div style={{width: '60%'}}>
                            <h3>{detail.name}</h3>
                            {detail.types && detail.types.length > 0 && detail.types.map(typeObj => (
                                <h5 key={typeObj.type.name}>{typeObj.type.name}</h5>
                            ))}
                        </div>
                        <div style={{width: '40%', display: 'flex'}}>
                            <img
                                crossOrigin="anonymous"
                                id={detail.sprites.front_default}
                                style={{margin: 'auto', width: '100%'}}
                                src={detail.sprites.front_default}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card;