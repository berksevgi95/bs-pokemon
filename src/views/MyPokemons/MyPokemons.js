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
            {myPokemons.length === 0 && (
                <div
                    style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        display: 'flex'
                    }}
                >
                    <div style={{
                        margin: 'auto'
                    }}>
                        <h1 style={{textAlign: 'center'}}>
                            ¯\_(ツ)_/¯
                        </h1>
                        <p style={{textAlign: 'center'}}>
                            No Pokemons listed here
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default withRouter(Pokemons);