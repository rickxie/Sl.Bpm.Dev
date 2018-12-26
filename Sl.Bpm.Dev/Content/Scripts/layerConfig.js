window.$alert = function (msg, title) {
    layer.alert(msg, { title: title || "提示" });
}
window.$confirm = function (msg, callback1, callback2) {
    layer.confirm(msg, {
        btn: ['确定', '取消'], //按钮
        title: "提示"
    }, function (index) {
        callback1();
        layer.close(index);
    }, function () {
        if (!!callback2) {
            callback2();
        }
    });
}
window.$toast = function (msg) {
    mabp.notify.error(msg);
}
window.$prompt = function (content, callback, type) {
    layer.prompt({ title: content, formType: type || 0 }, function (mess, index) {
        callback(mess)
        layer.close(index);
    });
}
loader = null;
window.$load = function (type) {
    if (type == false) {
        layer.close(loader);
    } else {
        loader = layer.load(2, {
            shade: [0.3, '#fff']
        });
    }
}