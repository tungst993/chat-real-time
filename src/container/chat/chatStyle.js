import styled from 'styled-components'

const Wrapper = styled.div`
    width: 600px; 
    margin: auto;
`

const Title = styled.h1`
    text-align: center;
`

const Left = styled.div`
    min-height: 500px; 
    float: left; 
    margin-top: 10px;
    width: 30%; 
    background:#eaf4b7;
`

const LeftTitle = styled.div`
    background-color: #ccf900; 
    text-align: center; 
    padding: 5px;
`

const MenuUser = styled.div`

`

const Right = styled.div`
    min-height: 500px; 
    float: left; 
    margin-top: 10px;
    width: 70%; 
    background-color: #d6f9d9;
`

const MenuMessege = styled.div`
    height: 450px; 
    overflow: scroll; 
    clear: both;
`

const Block = styled.div`
    width: 100%; 
    clear: both;
`

const UserName = styled.div`
    color: red; 
    font-weight: bold;
`
const SignOutBtn = styled.button`
    float: right;
    background-color: white;
    color: black;
    border: 2px solid #F44336;
    padding: 1% 2%;
    border-radius: 5%;
    cursor: pointer;
`

export {
    Wrapper,
    Title,
    Left,
    LeftTitle,
    MenuUser,
    Right,
    MenuMessege,
    Block,
    UserName,
    SignOutBtn,
}