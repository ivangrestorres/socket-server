class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on("connection", (socket) => {
            socket.emit("mensaje-bienvenida", {
                msg: "Hola mundo!",
                fecha: new Date(),
            });

            socket.on("mensaje-to-server", (data) => {
                console.log(data);
                this.io.emit("mensaje-to-client", data);
            });
        });
    }
}

module.exports = Sockets;
