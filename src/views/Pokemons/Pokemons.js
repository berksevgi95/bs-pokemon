import React from 'react'
import { withRouter } from 'react-router-dom'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Axios from '../../utils/axios'

import './styles.css'

const Pokemons = ({
    history
}) => {

    const [pokemons, setPokemons] = React.useState([])
    const [render, setRender] = React.useState(false)
    const [next, setNext] = React.useState(null)

    React.useEffect(() => {
        Axios.get('/pokemon')
            .then((result) => {
                setPokemons(result.data.results)
                setNext(result.data.next)
            })
    }, [])

    const onClick = (detail) => {
        setRender(true)
        setTimeout(() => {
            history.push(`/pokemons/${detail.id}`)
        }, 500)
    }

    const showMore = () => {
        Axios.get(next)
            .then((result) => {
                setPokemons([...pokemons, ...result.data.results])
                setNext(result.data.next)
            })
    }

    return (
        <div className={`pokemon ${render ? 'all-fadeout' : 'all-fadein'}`}>
            {pokemons && pokemons.length > 0 && pokemons.map(pokemon => (
                <PokemonCard
                    onClick={onClick}
                    key={pokemon.name}
                    pokemon={pokemon} 
                />
            ))}
            <div 
                className="show-more"
                onClick={showMore}
            >
                    <span>
                        Show More
                    </span>
            </div>
        </div>
    )
}

export default withRouter(Pokemons);