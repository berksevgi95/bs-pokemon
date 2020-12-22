import React from 'react'
import Card from '../../components/Card/Card'
import Axios from '../../utils/axios'

import './styles.css'

const All = () => {

    const [pokemons, setPokemons] = React.useState([])
    const [render, setRender] = React.useState(false)

    React.useEffect(() => {
        Axios.get('/pokemon')
            .then((result) => {
                setPokemons(result.data.results)
            })
    }, [])

    const onClick = () => {
        setRender(true)
    }

    console.log(render)

    return (
        <div className={render ? 'all-fadeout' : 'all-fadein'}>
            {pokemons && pokemons.length > 0 && pokemons.map(pokemon => (
                <Card
                    onClick={onClick}
                    key={pokemon.name}
                    data={pokemon} 
                />
            ))}
        </div>
    )
}

export default All;