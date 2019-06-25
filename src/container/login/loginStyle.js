import styled from 'styled-components';

const Login = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4%;
`

const LoginForm = styled.form`
    border: 3px solid #f1f1f1;
`

const LoginImg = styled.div`
    text-align: center;
    margin: 24px 0 12px 0;
`
const ImgAvatar = styled.img`
    width: 20%;
    border-radius: 50%;
`

const LoginContainer = styled.div`
    padding: 16px;
`

const LoginInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
`

const LoginSubmit = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
`

export {
    Login,
    LoginForm,
    LoginImg,
    LoginContainer,
    LoginInput,
    LoginSubmit,
    ImgAvatar,
}