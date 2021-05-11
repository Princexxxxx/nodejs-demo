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

        // setTimeout或setInterval创建的定时器会被插入到定时器观察者内部的一个红黑树中
        // 可能会存在超时
        setTimeout(() => {
            console.timeEnd('延时耗时');
        }, 5000);

        res.end('Ok');
    }
})

server.listen('3004', () => {
    process.title = 'Asynchronous Server';
    console.log('进程id:', process.pid);
})