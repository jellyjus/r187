const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const utils = require('./utils/index');

class Server {
    constructor() {
        this.app = express();
        this.setup();
    }

    setup() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(express.static(__dirname + '/client/build'));

        this.createRoutes();
        this.createServer();
        this.createSockets();
    }

    createRoutes() {
        this.app.get('/', (req, res) => {
            let template = fs.readFileSync('./client/build/index1.html', 'utf8');
            const index = template.indexOf('<body>');
            template = template.slice(0, index+7) + `
                <script>
                    window['host'] = "${this.serverConfig.host}";
                    window['port'] = ${this.serverConfig.port};
                </script>
            ` + template.slice(index+7);

            res.send(template);
        });

        this.app.get('**', (req, res) => {
            let template = fs.readFileSync('./client/build/index1.html', 'utf8');
            const index = template.indexOf('<body>');
            template = template.slice(0, index+7) + `
                <script>
                    window['host'] = "${this.serverConfig.host}";
                    window['port'] = ${this.serverConfig.port};
                </script>
            ` + template.slice(index+7);

            res.send(template);
        })
    }

    createServer() {
        this.serverConfig = JSON.parse(fs.readFileSync('./server-config.json', 'utf8'));
        this.server = require('http').createServer(this.app);
        this.server.listen(this.serverConfig.port, this.serverConfig.host, () =>
            console.log(`Start listening on ${this.serverConfig.host}:${this.serverConfig.port}`)
        );
    }

    createSockets() {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('setId', (id) => {
                if (typeof id !== 'number') {
                    return new Error('Error on set socket id')
                }
                console.log('Change socket id to', id);

                socket._id = id;
            });

            socket.on('sendMessage', (data) => {
                const target = utils.getSocketById(data.id, this.io.sockets.connected);
                console.log(target);
            });
        });
    }

}

module.exports = new Server;
