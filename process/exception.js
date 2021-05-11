const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', (req, res) => {
    // TypeError: Cannot read property 'c' of undefined
    console.log({}.b.c);

    res.end('Ok')
})


server.listen('3003', () => {
    process.title = 'Process Exception Server';
    console.log('进程id:', process.pid);
})


// 'uncaughtException' 事件是一种粗糙的异常处理的机制，只能用作不得已的最后手段。
// 此事件不应该被用作相当于就算出错也继续执行，未处理的异常本身就意味着应用程序处于未定义的状态。
// 尝试恢复应用程序代码而未正确地从异常中恢复，可能会导致其他无法预料和不可预测的问题。
process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `捕获的异常: ${err}\n` +
        `异常的来源: ${origin}`
    );
});