let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    const users = {}

    socket.on('new-user', (name) => {
        console.log('Name is '+ name);
        users[socket.id] = name;
        io.emit('user-connected', { name: name})
    });

    socket.on('send-message', (message) => {
        console.log('Name is '+ users[socket.id] + ' Message is '+ message);
        io.emit('message', { message: message, name: users[socket.id] })
        });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
