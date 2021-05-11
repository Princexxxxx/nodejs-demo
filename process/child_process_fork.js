const Utils = require('../utils');

const computation = () => {
    console.info('计算开始');
    console.time('计算耗时');

    const result = Utils.fibonacci(44);

    console.info('计算结束');
    console.timeEnd('计算耗时');

    return result;
};

process.on('message', msg => {
    console.log(msg, 'process.pid', process.pid); // 子进程id
    const result = computation();

    // IPC: Inter-Process Communication, 即进程间通信, 它的目的是为了让不同的进程能够互相访问资源并进行协调工作
    // 实现进程间通信的技术有很多，如命名管道，匿名管道，socket，信号量，共享内存，消息队列等。Node中实现IPC通道是依赖于libuv
    // 如果Node.js进程是通过进程间通信产生的，那么process.send()方法可以用来给父进程发送消息
    process.send(result);
})
