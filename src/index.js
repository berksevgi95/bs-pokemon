import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import All from './views/All/All';
import MyPokemons from './views/MyPokemons/MyPokemons';

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
                        <Redirect to="/all" />
                    </Route>
                    <Route exact path="/all">
                        <All />
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
