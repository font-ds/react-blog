import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
function Main() {
    return (
        <Router>
            <Switch>
                <Route path='/login/' exact component={Login} />
                <Route path='/index/' exact component={AdminIndex} />
                <Route path='/index/add' exact component={AdminIndex} />
                <Route path='/index/list' exact component={AdminIndex} />
                <Route path="/index/add/:id" exact component={AdminIndex} />

                <Route path='/'>
                    <Redirect to='/login/' />
                </Route>
            </Switch>
        </Router>
    )
}

export default Main