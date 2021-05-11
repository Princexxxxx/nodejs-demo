const Utils = {
    sleep: function (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    },
    // 计算斐波那契数列第n项
    fibonacci: function(num) {
        if (num === 0) return 0;
        if (num === 1) return 1;

        return Utils.fibonacci(num - 2) + Utils.fibonacci(num - 1);
    }
}

module.exports = Utils;