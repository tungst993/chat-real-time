import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';
import {
  Login,
  LoginForm,
  LoginImg,
  LoginContainer,
  LoginInput,
  LoginSubmit,
  ImgAvatar,
} from './loginStyle'
import * as actions from '../../redux/actions/username';
import io from 'socket.io-client';
import avatar from '../avatar.png';


class LoginPage extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault()
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
      <Login>
        <LoginForm onSubmit={this.handleSubmit}>
          <LoginImg >
            <ImgAvatar src={avatar} alt="Avatar" className="avatar" />
          </LoginImg>
          <LoginContainer>
            <label htmlFor="uname"><b>Username</b></label>
            <LoginInput type="text" placeholder="Enter Username" onChange={this.handleChange} ref="username" name="uname" required />
            <LoginSubmit type="submit">Login</LoginSubmit>
          </LoginContainer>
        </LoginForm>
      </Login>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
