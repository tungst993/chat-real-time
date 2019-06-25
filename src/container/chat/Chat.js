import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/username'
// import styled from 'styled-components';
import './chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.userMessage = [];
        this.state = {
            mangUsers: [],
            messageText: '',
            showdata: this.userMessage,
            postVal: "",
        }
        this.socket = io('http://localhost:8888')
        let that = this
        this.socket.on("server_send_message", function (data) {
            that.userMessage.push(<div><pre>{`${data.username}: ${data.msg}`}</pre></div>)
            that.setState({
                showdata: that.displayData,
                postVal: ""
             });
        })
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        axios.get('http://localhost:8888/users')
            .then(res => this.setState({ mangUsers: res.data }))
            .catch(err => console.log(err))
    }

    signout = () => {
        this.props.logout()
        this.socket.emit('remove-user', this.props.username)
    }

    sendMessage = () => {
        this.socket.emit('client-send-message', { username: this.props.username, msg: this.state.postVal })
    }

    handleChange = (e) => {
        let getTextAreaValue = e.target.value;
        this.setState({
          postVal: getTextAreaValue
        });
    }

    render() {
        const { mangUsers, message } = this.state
        const { username } = this.props

        console.log("render")
        return (
            <div id="wrapper">
                <h1>DEMO CHAT SOCKET IO - NODEJS</h1>
                <p>
                    Welcome {this.props.username} !!
                    <button onClick={this.signout}>Sign out</button>
                </p>
                <div class="block"></div>
                <div id="left">
                    <div id="title">Users Online</div>
                    <div id="danhsachUsersOnline">
                        {mangUsers.map(das => (
                            <div>{das}</div>
                        ))}
                    </div>
                </div>
                <div id="right">
                    <div id="dsMsg">
                        {this.userMessage}
                    </div>
                    <div class="block"></div>
                    <textarea rows="2" cols="40" value={this.state.postVal} onChange={this.handleChange} ></textarea>
                    <input type="submit" className="button" onClick={this.sendMessage} value="Comment" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.username }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (username) => {
            dispatch(actions.logout())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);