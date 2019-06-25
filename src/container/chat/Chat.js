import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import {
    Wrapper,
    Title,
    Left,
    LeftTitle,
    MenuUser,
    Right,
    MenuMessege,
    Block,
    UserName,
    SignOutBtn
} from './chatStyle'
import * as actions from '../../redux/actions/username'

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
            <Wrapper>
                <Title>DEMO CHAT SOCKET IO - NODEJS</Title>
                <p>
                    Welcome {this.props.username} !!
                    <SignOutBtn onClick={this.signout}>Sign out</SignOutBtn>
                </p>
                <Block></Block>
                <Left>
                    <LeftTitle>Users Online</LeftTitle>
                    <div id="danhsachUsersOnline">
                        {mangUsers.map(das => (
                            <div>{das}</div>
                        ))}
                    </div>
                </Left>
                <Right>
                    <MenuMessege>
                        {this.userMessage}
                    </MenuMessege>
                    <Block></Block>
                    <textarea rows="2" cols="40" value={this.state.postVal} onChange={this.handleChange} ></textarea>
                    <input type="submit" className="button" onClick={this.sendMessage} value="Comment" />
                </Right>
            </Wrapper>
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