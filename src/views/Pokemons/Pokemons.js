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
        <div style={{height: '100%', paddingBottom: 50}} className={render ? 'all-fadeout' : 'all-fadein'}>
            {pokemons && pokemons.length > 0 && pokemons.map(pokemon => (
                <PokemonCard
                    onClick={onClick}
                    key={pokemon.name}
                    pokemon={pokemon} 
                />
            ))}
            <div 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={showMore}>
                    <span>
                        Show More
                    </span>
            </div>
        </div>
    )
}

export default withRouter(Pokemons);