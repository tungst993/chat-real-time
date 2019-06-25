import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    // Link,
    Redirect,
    // withRouter
} from 'react-router-dom';
import Chat from './container/chat/Chat';
import Login from './container/login/Login'


class App extends React.Component {
    render() {
        const PrivateRouter = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.username
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                    />
            )}
            />
        )
        return (
            <Router>
                <Route path='/login' component={Login} />
                <PrivateRouter path='/chat' component={Chat} />
                <Redirect to='/login'/>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.username }
}

export default connect(mapStateToProps)(App);
