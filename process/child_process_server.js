const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer();

server.on('request', (req, res) => {
    if(req.url == '/compute/fibonacci') {
        const compute = fork('./process/child_process_fork.js');

        compute.send('开启一个新的子进程');

        // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
        compute.on('message', result => {
            res.end(`fibonacci 44 item: ${result}`);
            compute.kill();
        });

        // 子进程监听到一些错误消息退出
        compute.on('close', (code, signal) => {
            console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
            compute.kill();
        })
    } else {
        console.info(`${req.url} 请求结束 ${new Date()}`);
        res.end('Hello World');
    }
})

server.listen(3001, () => {
    process.title = 'Fibonacci child_process Server';
});
