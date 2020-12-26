import React from 'react'
import { withRouter } from 'react-router-dom'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import Axios from '../../utils/axios'
import { Context } from '../../utils/context'

import './styles.css'

const Pokemons = ({
    history
}) => {

    const { myPokemons } = React.useContext(Context)

    // const [pokemons, setPokemons] = React.useState([])
    const [render, setRender] = React.useState(false)

    // React.useEffect(() => {
    //     Axios.get('/pokemon')
    //         .then((result) => {
    //             setPokemons(result.data.results)
    //         })
    // }, [])

    const onClick = (detail) => {
        setRender(true)
        setTimeout(() => {
            history.push(`/my-pokemons/${detail.id}`)
        }, 500)
    }


    return (
        <div style={{height: '100%', paddingBottom: 50}} className={render ? 'all-fadeout' : 'all-fadein'}>
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