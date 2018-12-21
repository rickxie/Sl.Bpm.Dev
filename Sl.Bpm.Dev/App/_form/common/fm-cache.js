_shared.directive('fmCache', ['$timeout', 'mabp.app.module', function ($timeout, sv) {
    return {
        restrict: 'AE',
        controller: ['$scope', function (scope) {
            var that = this;
            this.cachedList = []; //缓存已经成功返回了的数据。
            this.batchRequest = []; //批量请求

            //注册请求获得将要的返回结果
            this.batchAdd = function (serviceName, methodName, param) {
                var guid = _$.getGUID();
                //所有请求存储，并分配一个Promise
                var promisedItem = { id: guid, service: serviceName, method: methodName, param: param, response: null, promise: $.Deferred() };
                //若缓存存在直接返回
                var alreadyHas = _.find(that.cachedList, function (cachedItem) {
                    return _.isEqual(promisedItem.service, cachedItem.service)
                        && _.isEqual(promisedItem.method, cachedItem.method)
                        && _.isEqual(promisedItem.param, cachedItem.param);
                });
                if (alreadyHas != null) {
                    $timeout(function () {
                        promisedItem.promise.resolve(alreadyHas.response);
                    });
                    return promisedItem.promise;
                }
                //以上为找到缓存后直接返回
                that.batchRequest.push(promisedItem);

                if (that.batchRequest.length === 1) {
                    that.startService();
                }
                return promisedItem.promise;
            }
            //拆分已经缓存的请求
            this.splitCachedRequest = function (batchRequest) {
                return _.filter(batchRequest, function (batchItem) {
                    var alreadyHas = _.find(that.cachedList, function (cachedItem) {
                        return _.isEqual(batchItem.service, cachedItem.service)
                            && _.isEqual(batchItem.method, cachedItem.method)
                            && _.isEqual(batchItem.param, cachedItem.param);
                    });
                    if (alreadyHas != null) {
                        batchItem.promise.resolve(alreadyHas.response);
                    }
                    return alreadyHas == null;
                });
            }
            //排重
            this.getDuplicationObj = function (arr) {
                var result = { requestItem: [], callBackItem: [] };
                if (arr != null) {
                    var rq = [];
                    var cb = [];
                    _.forEach(arr, function (ccur) {
                        var cloneCur = _.cloneDeep(ccur);
                        var isIn = _.find(rq, function (cur) {
                            return _.isEqual(cur.service, cloneCur.service)
                                && _.isEqual(cur.method, cloneCur.method)
                                && _.isEqual(cur.param, cloneCur.param);
                        });

                        if (isIn) {
                            cb.push(cloneCur);
                        } else {
                            rq.push(cloneCur);
                        }
                    });
                    result.requestItem = rq;
                    result.callBackItem = cb;
                }
                return result;
            }
            //重组请求参数
            this.prepareRequest = function (arr) {
                var result = [];
                if (arr != null) {
                    for (var i = 0; i < arr.length; i++) {
                        var curItem = arr[i];
                        curItem.param = JSON.stringify(curItem.param);
                        result.push(curItem);
                    }
                }
                return result;
            }
            //每300毫秒启动服务
            this.startService = function () {
                $timeout(function () {
                    var batching = that.batchRequest;
                    that.batchRequest = [];
                    //如果存在则直接返回，不存在合并发送。
                    var allRequest = that.splitCachedRequest(batching);
                    //拆分重复项 排重调用
                    var duplicateObj = that.getDuplicationObj(allRequest);
                    var request = that.prepareRequest(duplicateObj.requestItem);
                    if (request != null && request.length > 0) {
                        sv.getBatchResult(request).then(function (result) {
                            if (result != null && result.length > 0) {
                                for (var i = 0; i < result.length; i++) {
                                    var curResult = result[i];
                                    var rq = _.find(allRequest, { id: curResult.id });
                                    if (curResult.response.isSuccess) {
                                        rq.promise.resolve(curResult.response.data);
                                        rq.response = curResult.response.data;
                                        that.cachedList.push(rq);
                                    } else {
                                        console.error("调用失败: Service: " + curResult.serviceName +
                                            "Method: " + curResult.methodName + "错误信息:" + curResult.response.Error);
                                        rq.promise.reject(null);
                                    }
                                }
                                //剩余项返回
                                that.splitCachedRequest(duplicateObj.callBackItem);
                            }
                        });
                    }
                    //300毫秒一次请求
                }, 100);
            }
        }]
    }
}])