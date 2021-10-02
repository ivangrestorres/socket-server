const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        // Config de sockets
        this.io = socketio(this.server);
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, "../public")));
    }

    configurarSockets() {
        new Sockets(this.io);
    }

    start() {
        this.middlewares();
        this.configurarSockets();

        this.server.listen(this.port, () =>
            console.log(`Server en puerto: http://localhost:${this.port}`)
        );
    }
}

module.exports = Server;
