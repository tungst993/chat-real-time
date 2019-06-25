import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';
import * as actions from '../../redux/actions/username';
import io from 'socket.io-client';
import './App.css';
import avatar from '../avatar.png'


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mangUsers: [],
      username: null,
    }
    const main = this
  this.socket = io('http://localhost:8888')
  this.socket.on("signin-success", function (data) {
    main.props.submit(main.state.username)
  })
  this.socket.on("signin-fail", function (data) {
    alert("User " + data + " is not availble!")
  })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.username !== nextProps.username) {
  //     return true;
  //   }
  //   if (this.state.mangUsers !== nextState.mangUsers) {
  //     return true;
  //   }
  //   return false;
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.username)
    const { username } = this.refs
    this.socket.emit("client-send-username", username.value)

  }

  handleChange = (e) => {
    let a = e.target.value
    this.setState({
      username: a
    })
  }

  getUser = () => {
   
  }

  render() {
    const { username } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/chat' } }

    if (username) {
      return <Redirect to={from} />
    }
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div className="imgcontainer">
            <img src={avatar} alt="Avatar" className="avatar" />
          </div>
          <div className="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" onChange={this.handleChange} ref="username" name="uname" required />

            {/* <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" ref="password" name="psw" required /> */}

            <button type="submit">Login</button>
            <label>
              {/* <input type="checkbox" checked="checked" name="remember" /> Remember me */}
            </label>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { username: state.username }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (username) => {
      dispatch(actions.login(username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
