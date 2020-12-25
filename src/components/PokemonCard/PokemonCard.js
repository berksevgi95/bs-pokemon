import React from 'react'
import AverageColor from '../../utils/average-color'
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

    const [background, setBackground] = React.useState({})


    React.useEffect(() => {
        setLoading(true)
        Axios.get(pokemon.url)
            .then((result) => {
                setDetail(result.data)
            })
    }, [])


    const handleOnClick = () => {
        if (onClick)
            onClick(detail)
    }

    const handleOnLoad = (e) => {
        AverageColor(e.target).then(colorObj => {
            setBackground(colorObj)
            setLoading(false)
        })
    }

    return (
        <div className="card-container">
            <div className="card" style={{background: `rgb(${background.r},${background.g},${background.b}, .9)`}}>
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
                            <h3 className={Object.keys(background).length > 0 ? 'color-white' : ''}>{detail.name}</h3>
                            {detail.types && detail.types.length > 0 && detail.types.map(typeObj => (
                                <h5 className={Object.keys(background).length > 0 ? 'color-white' : ''} key={typeObj.type.name}>{typeObj.type.name}</h5>
                            ))}
                        </div>
                        <div style={{width: '40%', display: 'flex'}}>
                            <img
                                id={detail.sprites.front_default}
                                style={{margin: 'auto', width: '100%'}}
                                src={detail.sprites.front_default}
                                onLoad={handleOnLoad}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card;