/**
 * 经典计算耗时造成线程阻塞
 */
const http = require('http');
const Utils = require('../utils');
const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/compute/fibonacci') {
        console.info('开始计算');
        console.time('计算耗时');

        // 同步阻塞，当前线程会被挂起等待当前函数返回
        const result = Utils.fibonacci(44);

        console.timeEnd('计算耗时');

        res.end(`fibonacci 44 item: ${result}`);
    } else {
        console.info(`${req.url} 请求结束 ${new Date().getTime()}`);
        res.end('Hello World')
    }
});

server.listen(3000, () => {
    process.title = 'Fibonacci Compute Server';
    console.info('Server Start at 3000 port');
});