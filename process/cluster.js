/**
 * cluster模块调用fork方法来创建子进程，该方法与child_process中的fork是同一个方法。
 * cluster模块采用的是经典的主从模型，Cluster会创建一个master，然后根据你指定的数量复制出多个子进程，可以使用cluster.isMaster属性判断当前进程是master还是worker(工作进程)。
 * 由master进程来管理所有的子进程，主进程不负责具体的任务处理，主要工作是负责调度和管理。
 */

const cluster = require('cluster');
const http = require('http');
const cpus = require('os').cpus();

console.log('server start, cpu count: ', cpus.length);

if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++) {
        cluster.fork(); // 启动子进程
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Worker可以共享同一个TCP连接, 这里是一个http服务器
    const server = http.createServer((req, res) => {
        res.writeHead(200);

        res.end(JSON.stringify(cpus));
    });

    server.listen(3002, () => {
        process.title = 'Cluster Server';
        console.log('子进程id:', process.pid);
    });
}