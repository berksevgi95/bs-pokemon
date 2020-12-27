import React from 'react';
import Message from '../components/Message/Message';

export const Context = React.createContext();

const Provider = ({
    children
}) => {

    const messageRef = React.useRef()
    const [myPokemons, setMyPokemons] = React.useState(
        sessionStorage.getItem('my-pokemons') ?
            JSON.parse(sessionStorage.getItem('my-pokemons')) : []
    )

    const handleSetMyPokemons = (newPokemon) => {
        if (isAdded(newPokemon)) {
            setMyPokemons(myPokemons.filter(pokemon => pokemon.id !== newPokemon.id))
            sessionStorage.setItem('my-pokemons', JSON.stringify(
                myPokemons.filter(pokemon => pokemon.id !== newPokemon.id)
            ))
        } else {
            setMyPokemons([...myPokemons, newPokemon])
            sessionStorage.setItem('my-pokemons', JSON.stringify(
                [...myPokemons, newPokemon]
            ))
            messageRef.current.fire(document.getElementById('my-pokemons'), `${newPokemon.name} has been added to My Pokemons list`)
        }
    }

    const isAdded = (newPokemon) => {
        const newArr = myPokemons.filter(pokemon => pokemon.id !== newPokemon.id)
        if (newArr.length !== myPokemons.length) {
            return true
        } else {
            return false
        }
    }

    return (
        <Context.Provider
            value={{
                myPokemons,
                addRemoveMyPokemonsList: handleSetMyPokemons,
                isAdded
            }}
        >
            <Message
                ref={messageRef}
            />
            {children}
        </Context.Provider>
    )
}

export default Provider