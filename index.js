// Підключення модулів
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

// Прослуховування порту
server.listen(5000, () => {
    console.log('Сервер запущено на порту 5000');
});

// Відслідковування URL-адреси та завантаження вмісту файлу HTML
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

// Створення масивів для користувачів та підключень
let users = [];
let connections = [];

// Функція, яка спрацьовує, коли користувач підключається до чату
io.sockets.on('connection', function(socket) {
    console.log('Підключення');
    connections.push(socket);

    // Функція, яка спрацьовує, коли користувач покидає чат
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Відключено');
    });

    // Функція, яка отримує ім'я та повідомлення від користувача
    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', { mess: data.mess, name: data.name });
    });
});
