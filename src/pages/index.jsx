import React from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Header } from '../components/Header/Header'


export const Root = () => {
    return <Router>
        <div>
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    </Router>
}