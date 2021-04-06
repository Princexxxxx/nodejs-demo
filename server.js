const http = require('http');

const server = http.createServer();

server.listen('3000', () => {
    process.title = 'Nodejs Http Server';

    console.log('进程id:', process.pid);
})