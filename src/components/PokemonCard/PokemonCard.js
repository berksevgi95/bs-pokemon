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
        if (pokemon.url) {
            Axios.get(pokemon.url)
                .then((result) => {
                    setDetail(result.data)
                    setLoading(false)
                })
        } else {
            setDetail(pokemon)
            setLoading(false)
        }
        
    }, [])


    const handleOnClick = () => {
        if (onClick)
            onClick(detail)
    }

    return (
        <div className="card-container">
            <div className="card">
                {loading && (
                    <div className="loading-container">
                        <h3>Loading...</h3>
                    </div>
                )}
                {!detail ? (
                    <div>Error</div>
                ) : (
                    <div
                        onClick={handleOnClick}
                        className="card-content"
                    >
                        <div className="text">
                            <h3>
                                {detail.name}
                            </h3>
                            {detail.types && detail.types.length > 0 && detail.types.map(typeObj => (
                                <h5 key={typeObj.type.name}>
                                    {typeObj.type.name}
                                </h5>
                            ))}
                        </div>
                        <div className="image">
                            <img
                                id={detail.sprites.front_default}
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