import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Pokemons from './views/Pokemons/Pokemons';
import MyPokemons from './views/MyPokemons/MyPokemons';
import PokemonDetail from './views/PokemonDetail/PokemonDetail';

import './styles.css'
import Header from './components/Header/Header';
import Main from './components/Main/Main';

const App = () => {
    return (
        <Router>
            <Header></Header>
            <Main>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/pokemons" />
                    </Route>
                    <Route exact path="/pokemons">
                        <Pokemons />
                    </Route>
                    <Route exact path="/pokemons/:id">
                        <PokemonDetail />
                    </Route>
                    <Route path="/my-pokemons">
                        <MyPokemons />
                    </Route>
                </Switch>
            </Main>
            
        </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
