const http = require('http');
const Utils = require('../utils');
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/compute/fibonacci') {
        console.info('开始计算');
        console.time('计算耗时');

        // 这个计算任务将占用7、8秒的CPU时间片
        const result = Utils.fibonacci(44);

        console.timeEnd('计算耗时');

        res.end(`fibonacci 44 item: ${result}`);
    } else {
        console.info('延时计时');
        console.time('延时耗时');

        // 定时器的问题在于，它并非精确的
        setTimeout(() => {
            console.timeEnd('延时耗时');
        }, 5000);

        res.end('Hello World');
    }
})

server.listen('3004', () => {
    process.title = 'Asynchronous Server';
})