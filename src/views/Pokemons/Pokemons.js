import React from 'react'
import { withRouter } from 'react-router-dom'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Axios from '../../utils/axios'

import './styles.css'

const All = ({
    history
}) => {

    const [pokemons, setPokemons] = React.useState([])
    const [render, setRender] = React.useState(false)

    React.useEffect(() => {
        Axios.get('/pokemon')
            .then((result) => {
                setPokemons(result.data.results)
            })
    }, [])

    const onClick = (detail) => {
        setRender(true)
        setTimeout(() => {
            history.push(`/pokemons/${detail.id}`)
        }, 500)
    }

    return (
        <div className={render ? 'all-fadeout' : 'all-fadein'}>
            {pokemons && pokemons.length > 0 && pokemons.map(pokemon => (
                <PokemonCard
                    onClick={onClick}
                    key={pokemon.name}
                    pokemon={pokemon} 
                />
            ))}
        </div>
    )
}

export default withRouter(All);