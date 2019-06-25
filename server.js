var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');
var session = require('express-session');

app.use (session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 }
  }))

const port = 8888
var mangUser = {}
app.use(cors())

io.on('connection', function (socket) {
    socket.on('client-send-username', function (data) {
        console.log(data + " login")
        if (mangUser[data]) {
            io.sockets.emit("signin-fail", data);
            return
        }
        mangUser[data] = true;
        socket.Username = data;
        console.log('socket.Username', socket.Username);
        io.sockets.emit("signin-success", data);

    });

    socket.on('remove-user', function (data) {
        delete mangUser[data]
    })

    socket.on('client-send-message', function (data) {
        console.log(data)
        io.sockets.emit("server_send_message", { username: data.username, msg: data.msg })
    })
    socket.on('disconnect', () => {
        delete mangUser[socket.Username]
        console.log(socket.id + 'disconnected')
    })
})

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/users', function (req, res) {
    res.end(JSON.stringify(Object.keys(mangUser)))
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
