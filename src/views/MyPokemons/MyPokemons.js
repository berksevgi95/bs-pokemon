import React from 'react'
import { withRouter } from 'react-router-dom'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import { Context } from '../../utils/context'

import './styles.css'

const Pokemons = ({
    history
}) => {

    const { myPokemons } = React.useContext(Context)

    const [render, setRender] = React.useState(false)

    const onClick = (detail) => {
        setRender(true)
        setTimeout(() => {
            history.push(`/my-pokemons/${detail.id}`)
        }, 500)
    }

    return (
        <div className={`my-pokemons ${render ? 'all-fadeout' : 'all-fadein'}`}>
            {myPokemons && myPokemons.length > 0 && myPokemons.map(pokemon => (
                <PokemonCard
                    onClick={onClick}
                    key={pokemon.name}
                    pokemon={pokemon} 
                />
            ))}
        </div>
    )
}

export default withRouter(Pokemons);