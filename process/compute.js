/**
 * 经典计算耗时造成线程阻塞
 */

const http = require('http');

const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
        sum += i;
    };
    return sum;
};

const server = http.createServer();

server.on('request', (req, res) => {
    if (req.url === '/compute') {
        console.info('计算开始', new Date());

        const sum = longComputation();

        console.info('计算结束', new Date());

        return res.end(`Sum is ${sum}`);
    } else {
        res.end('Ok')
    }
});

server.listen(3000, () => {
    process.title = 'Computation Server';
});

//打印结果
//计算开始 2019-07-28T07:08:49.849Z
//计算结束 2019-07-28T07:09:04.522Z
