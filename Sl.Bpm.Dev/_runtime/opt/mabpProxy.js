

(function(mabp, angular) {

    if (!angular)
    {
        return;
    }
    var module = angular.module('mabp');

    module.factory('mabp.app.chart', [
    '$http', function($http) {
    return new function()
    {
            this.getChartSysData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartSysData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChartNowSysData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartNowSysData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChartWfData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartWfData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWfId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetWfId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChartWfnData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartWfnData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChartWfDataByUserId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartWfDataByUserId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChartTskAvgHourByUserId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetChartTskAvgHourByUserId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllWorkflows = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetAllWorkflows',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWdProcess = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/GetWdProcess',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateWfStandardTime = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/chart/UpdateWfStandardTime',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.code', [
    '$http', function($http) {
    return new function()
    {
            this.list = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/List',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listChangeSet = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListChangeSet',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.codeItemDetail = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/CodeItemDetail',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listDiff = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListDiff',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.publish = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/Publish',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listPub = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListPub',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setPublisehd = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/SetPublisehd',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listLatestChangeSet = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListLatestChangeSet',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listFromChangeSet = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListFromChangeSet',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listFromPublish = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListFromPublish',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPublish = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/GetPublish',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChangeSet = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/GetChangeSet',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getDiff = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/GetDiff',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listCodeChangeHistory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListCodeChangeHistory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getLatestCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/GetLatestCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkIn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/CheckIn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.newCodeItem = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/NewCodeItem',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.move = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/Move',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.markAsDeleted = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/MarkAsDeleted',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.rename = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/Rename',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listDeletedFromChangeSet = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/ListDeletedFromChangeSet',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.compile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/code/Compile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.module', [
    '$http', function($http) {
    return new function()
    {
            this.getAllPagesEntries = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllPagesEntries',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBatchResult = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetBatchResult',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.invoke = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/Invoke',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.invokeDownload = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/InvokeDownload',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getOtherPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetOtherPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setFavouriteModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/SetFavouriteModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllFavouriteMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllFavouriteMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getViewTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetViewTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getViewOne = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetViewOne',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getChooseTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetChooseTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSingleGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetSingleGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getGroups = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetGroups',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobLevelEnumNameByValue = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetJobLevelEnumNameByValue',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPageBasicDataAndViewData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetPageBasicDataAndViewData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSql = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetSql',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllTableName = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllTableName',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllColumnName = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllColumnName',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMySubbmitterAgent = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetMySubbmitterAgent',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getLastWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetLastWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFavouriteMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetFavouriteMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getLastMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetLastMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.menuLog = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/MenuLog',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getTableInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetTableInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBasicDataById = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetBasicDataById',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.bpm', [
    '$http', function($http) {
    return new function()
    {
            this.editGroupExtension = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditGroupExtension',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteGroupExtension = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteGroupExtension',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getGroupExtensionByAreaCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetGroupExtensionByAreaCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getInterfaceList = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetInterfaceList',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFirstInterface = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetFirstInterface',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateInterface = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/UpdateInterface',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addInterface = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/AddInterface',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removeInterface = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/RemoveInterface',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.testOutputTemplate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/TestOutputTemplate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.testInterface = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/TestInterface',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNotificationsByPaged = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetNotificationsByPaged',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setNotificationAsRead = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SetNotificationAsRead',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setNotificationAsAllRead = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SetNotificationAsAllRead',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addNotification = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/AddNotification',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setNotificationAsDelete = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SetNotificationAsDelete',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUnReadNotificationCount = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetUnReadNotificationCount',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllEnterprise = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllEnterprise',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllEnterpriseUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllEnterpriseUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEnterprise = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditEnterprise',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteEnterprise = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteEnterprise',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEnterpriseUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditEnterpriseUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteEnterpriseUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteEnterpriseUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEnterprise = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetEnterprise',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSettings = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSettings',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSyncConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSyncConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateSyncConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/UpdateSyncConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.jobUserToGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/JobUserToGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.jobGroupToUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/JobGroupToUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getGroupTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetGroupTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedGroupTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSelectedGroupTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobTreeAndUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobTreeAndUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobToUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobToUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllJobToUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllJobToUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFilterJobUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetFilterJobUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSelectedJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedJobUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSelectedJobUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobTreeUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobTreeUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobTreeByJobId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobTreeByJobId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.moveNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/MoveNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.jobUnBindGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/JobUnBindGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.jobBindGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/JobBindGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.hasChildNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/HasChildNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateJob = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/UpdateJob',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.selectJob = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SelectJob',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNoAssignedGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetNoAssignedGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getGroups = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetGroups',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetUserJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedUserJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSelectedUserJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobsFromUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetJobsFromUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserAgent = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetUserAgent',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserAgentBySuperAdmin = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetUserAgentBySuperAdmin',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAgentInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAgentInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editAgent = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditAgent',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteAgent = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteAgent',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveSettings = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SaveSettings',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllMessageSettingByEnterpriseId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllMessageSettingByEnterpriseId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEnterpriseRole = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditEnterpriseRole',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllRoles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllRoles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteRole = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteRole',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteRoleJob = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteRoleJob',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveRoleJob = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SaveRoleJob',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveRoleJobArea = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/SaveRoleJobArea',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllRoleJob = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllRoleJob',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.buildRoleTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/BuildRoleTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getRoleTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetRoleTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedRoleJobs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetSelectedRoleJobs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllAppPages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllAppPages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPagesByParentPageId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetPagesByParentPageId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getDatatable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetDatatable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllForm = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllForm',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editAppPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditAppPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteAppPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteAppPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPageOfId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetPageOfId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getGroupExtension = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetGroupExtension',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.email', [
    '$http', function($http) {
    return new function()
    {
            this.mailTo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/email/MailTo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.importExport', [
    '$http', function($http) {
    return new function()
    {
            this.exportWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/importExport/ExportWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.importWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/importExport/ImportWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.data', [
    '$http', function($http) {
    return new function()
    {
            this.getFormData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/data/GetFormData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/data/SaveBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/data/DeleteBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.enterpriseInfoSync', [
    '$http', function($http) {
    return new function()
    {
            this.initAccessIdValidate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/InitAccessIdValidate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateAccessIdValidate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/UpdateAccessIdValidate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.initializeConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/InitializeConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflows = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetWorkflows',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedWorkflows = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetSelectedWorkflows',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.syncWorkflows = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/SyncWorkflows',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflowShowList = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetWorkflowShowList',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBusinessTables = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetBusinessTables',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.syncBusinessTables = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/SyncBusinessTables',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedBusinessTables = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetSelectedBusinessTables',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBusinessTableShowList = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetBusinessTableShowList',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFormPages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetFormPages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSelectedFormPages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetSelectedFormPages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.syncFormPages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/SyncFormPages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFormPageShowList = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/enterpriseInfoSync/GetFormPageShowList',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.file', [
    '$http', function($http) {
    return new function()
    {
            this.uploadFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/UploadFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.makeDir = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/MakeDir',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteFile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/DeleteFile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkDir = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/CheckDir',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getTaskFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetTaskFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getTaskLinkedFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetTaskLinkedFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getDraftFile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetDraftFile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.advancedUploadFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/AdvancedUploadFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkBaseConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/CheckBaseConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkColumnConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/CheckColumnConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.prepareAdvanceImportData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/PrepareAdvanceImportData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.downloadView = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/DownloadView',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getCodeFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetCodeFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateCodeFile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/UpdateCodeFile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.refreshAllFiles = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/RefreshAllFiles',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.downloadMergeExcel = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/DownloadMergeExcel',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.zip = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/Zip',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserFilesByUserId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetUserFilesByUserId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateUserFileDownloadTimes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/UpdateUserFileDownloadTimes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.insertJobConvertQueueAndUserFile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/InsertJobConvertQueueAndUserFile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.downloadBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/DownloadBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPicToBase64 = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/file/GetPicToBase64',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.page', [
    '$http', function($http) {
    return new function()
    {
            this.getPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/GetPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSubPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/GetSubPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.invokeEvent = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/InvokeEvent',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getProcHistory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/GetProcHistory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editAppPageRight = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/EditAppPageRight',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAppPageNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/GetAppPageNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteAppPageRight = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/page/DeleteAppPageRight',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.permission', [
    '$http', function($http) {
    return new function()
    {
            this.savePermissionGroupControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/SavePermissionGroupControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteControlGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/DeleteControlGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserPermissions = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetUserPermissions',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserPermissionsByAccount = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetUserPermissionsByAccount',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllPermissions = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetAllPermissions',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllKeys = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetAllKeys',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addOrUpdatePermissionGroupControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/AddOrUpdatePermissionGroupControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addAndGetGroupControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/AddAndGetGroupControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removePermissionGroupControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/RemovePermissionGroupControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllPermissionControlGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetAllPermissionControlGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPermissionControlGroupByEntityId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetPermissionControlGroupByEntityId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addOrUpdatePermissionGroupControlItem = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/AddOrUpdatePermissionGroupControlItem',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removePermissionGroupControlItem = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/RemovePermissionGroupControlItem',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllPermissionControlGroupItem = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetAllPermissionControlGroupItem',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllPermissionControlGroupItem = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetAllPermissionControlGroupItem',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflowPermission = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetWorkflowPermission',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteWorkflowControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/DeleteWorkflowControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveWorkflowControl = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/SaveWorkflowControl',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addOrUpdatePermission = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/AddOrUpdatePermission',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.system', [
    '$http', function($http) {
    return new function()
    {
            this.getUserInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetUserInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateActiveUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateActiveUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.sendPhoneCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SendPhoneCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.registerUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/RegisterUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.sendAutoLoginEmail = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SendAutoLoginEmail',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.resetValidationCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ResetValidationCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.resetLogin = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ResetLogin',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updatePassword = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdatePassword',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.resetAppUserAccessId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ResetAppUserAccessId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllLanguage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkPassword = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/CheckPassword',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.sendBingdingPhoneCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SendBingdingPhoneCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.sendBingdingEmailCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SendBingdingEmailCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkValidationCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/CheckValidationCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.confirmBingding = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ConfirmBingding',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.unBingding = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UnBingding',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEnums = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetEnums',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getLangs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetLangs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editLang = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditLang',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.clearEnterpriseLangs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ClearEnterpriseLangs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllEntityLanguages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllEntityLanguages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEntityCurrentLanguages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetEntityCurrentLanguages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.importBpmLangs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ImportBpmLangs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllEnumsByName = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllEnumsByName',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllEnums = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllEnums',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEnumName = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetEnumName',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEnum = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditEnum',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteEnum = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/DeleteEnum',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.clearEnterpriseEnums = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ClearEnterpriseEnums',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllBasicDataTypes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllBasicDataTypes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editBasicDataType = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditBasicDataType',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteBasicDataType = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/DeleteBasicDataType',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBreadCrumbData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetBreadCrumbData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEntireTreeBasicData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetEntireTreeBasicData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editBasicDataConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditBasicDataConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteBasicDataConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/DeleteBasicDataConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateBasicDataOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateBasicDataOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.importBasicDataConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ImportBasicDataConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getDateTimeNow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetDateTimeNow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listLangByKey = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ListLangByKey',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listLangBySearchKey = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ListLangBySearchKey',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditLanguage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.insertLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/InsertLanguage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/DeleteLanguage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addEmptyMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/AddEmptyMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetAllMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.swapIndex = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SwapIndex',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removeEmptyMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/RemoveEmptyMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSubMenuFromCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetSubMenuFromCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.update = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/Update',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.list = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/List',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateWorkflowMenu = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateWorkflowMenu',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getScheduleCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetScheduleCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listPageFromCode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/ListPageFromCode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.bindPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/BindPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.unbindPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UnbindPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.setMenuBindStatus = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/SetMenuBindStatus',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserExt = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetUserExt',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateUserExt = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/UpdateUserExt',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.table', [
    '$http', function($http) {
    return new function()
    {
            this.getAllPagedBusinessTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllPagedBusinessTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllBusinessTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllBusinessTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllBusinessTableTree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllBusinessTableTree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBusinessTablesByParentTableId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetBusinessTablesByParentTableId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getBusinessTablesByTableId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetBusinessTablesByTableId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editBusinessTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditBusinessTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteBusinessTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/DeleteBusinessTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.checkHasUnAppliedHistory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/CheckHasUnAppliedHistory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllBusinessTableColumns = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllBusinessTableColumns',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editBusinessTableColumn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditBusinessTableColumn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteBusinessTableColumn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/DeleteBusinessTableColumn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateBusinessTableColumnDisplayOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/UpdateBusinessTableColumnDisplayOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllViewTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllViewTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getViewTableById = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetViewTableById',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editViewTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditViewTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteViewTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/DeleteViewTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllViewTableColumns = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllViewTableColumns',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editViewTableColumn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditViewTableColumn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteViewTableColumn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/DeleteViewTableColumn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWfBusinessTableAndColumns = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetWfBusinessTableAndColumns',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getInformColums = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetInformColums',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.applyToDatabase = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/ApplyToDatabase',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateViewTableColumnDisplayOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/UpdateViewTableColumnDisplayOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllTablesAndViews = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllTablesAndViews',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.move = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/Move',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.jobTask', [
    '$http', function($http) {
    return new function()
    {
            this.list = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/List',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.single = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/Single',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.update = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/Update',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getCronInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/GetCronInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addEmpty = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/AddEmpty',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.remove = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/Remove',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.listCron = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/jobTask/ListCron',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.taskRead', [
    '$http', function($http) {
    return new function()
    {
            this.getPreProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetPreProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getHandledNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetHandledNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getDraftFormHeaderInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetDraftFormHeaderInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetUserInfo',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.task', [
    '$http', function($http) {
    return new function()
    {
            this.getPendingHandleTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetPendingHandleTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPendingReadTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetPendingReadTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPendingReadTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetPendingReadTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updatePendingReadTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/UpdatePendingReadTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updatePendingReadTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/UpdatePendingReadTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getModuleCountsForType = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetModuleCountsForType',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.moduleCountGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/ModuleCountGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.workFlowCountGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/WorkFlowCountGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getColumnConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetColumnConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyMarkedTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyMarkedTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyDraftTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyDraftTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyHandledTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyHandledTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyRaisedTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyRaisedTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyWaitedTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyWaitedTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyCopiedTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyCopiedTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyCopiedTasksDataTable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyCopiedTasksDataTable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyAuthorizedTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyAuthorizedTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyDelegatedTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyDelegatedTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMyAdvancedTasks = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetMyAdvancedTasks',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Submit = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Submit',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Agree = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Agree',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_AdditionalSigner = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_AdditionalSigner',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Reject = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Reject',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Delete = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Delete',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_RecedeToProposer = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_RecedeToProposer',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_TurnOver = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_TurnOver',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Cancel = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Cancel',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_RecedeToPreviousStep = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_RecedeToPreviousStep',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Copy = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Copy',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_SaveToDraft = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_SaveToDraft',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_DeleteDraft = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_DeleteDraft',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_SaveToTemplate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_SaveToTemplate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_SaveForm = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_SaveForm',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_RecedeToAnyStep = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_RecedeToAnyStep',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_RecedeToSepcificStep = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_RecedeToSepcificStep',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Recede = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Recede',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getUserLastProc = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetUserLastProc',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.event_Waiting = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Event_Waiting',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_ChangeProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_ChangeProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_ClearToProposer = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_ClearToProposer',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_BackToProposer = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_BackToProposer',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_BackToAnyStep = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_BackToAnyStep',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_BackToLastNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_BackToLastNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_ActiveTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_ActiveTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.backToNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/BackToNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.operation_TurnOver = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/Operation_TurnOver',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.markTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/MarkTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getHandledNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetHandledNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getTopHandleProcInTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetTopHandleProcInTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.user', [
    '$http', function($http) {
    return new function()
    {
            this.clearEnterpriseUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/user/ClearEnterpriseUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.clearCurrentAppEnterpriseUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/user/ClearCurrentAppEnterpriseUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFormUser = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/user/GetFormUser',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getJobUsers = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/user/GetJobUsers',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getCurrentUserUserJobGroup = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/user/GetCurrentUserUserJobGroup',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
    module.factory('mabp.app.workflow', [
    '$http', function($http) {
    return new function()
    {
            this.editColumnConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditColumnConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllColumnConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllColumnConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteColumnConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteColumnConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateColumnConfigDisplayOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/UpdateColumnConfigDisplayOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllCategories = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllCategories',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllAccessCategories = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllAccessCategories',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllWorkflows = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllWorkflows',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.chargeInformAndColumnLinkId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/ChargeInformAndColumnLinkId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAll = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAll',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.workflowOfId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/WorkflowOfId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllWorkflowVariable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllWorkflowVariable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editWorkflowVariable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditWorkflowVariable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteWorkflowVariable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteWorkflowVariable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflow = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetWorkflow',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateZoom = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/UpdateZoom',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getLink = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetLink',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveSingleLink = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/SaveSingleLink',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveLink = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/SaveLink',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteLink = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteLink',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.saveNodeData = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/SaveNodeData',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPageByNodeId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetPageByNodeId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getOtherStepNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetOtherStepNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflowActions = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetWorkflowActions',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNodeActions = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetNodeActions',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editActionEnable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditActionEnable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editActionLang = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditActionLang',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editActionReturnToNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditActionReturnToNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteActionReturnToNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteActionReturnToNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editNodeAction = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditNodeAction',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editNodeActions = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditNodeActions',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEntryEnable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditEntryEnable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editEntryCondition = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditEntryCondition',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editJumpTypeBinary = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditJumpTypeBinary',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editJumpNodeId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditJumpNodeId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editExamineEnable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditExamineEnable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editExamineStandardTime = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditExamineStandardTime',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editAutoHandle = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditAutoHandle',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editIsOvertimeInformEnable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditIsOvertimeInformEnable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editOvertimeBeginTime = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditOvertimeBeginTime',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editOvertimeIntervalTime = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditOvertimeIntervalTime',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editIsOvertimeActionEnable = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditIsOvertimeActionEnable',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editOvertimeActionTime = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditOvertimeActionTime',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editOvertimeActionType = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditOvertimeActionType',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNodeCopys = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetNodeCopys',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addOrUpdateNodeCopyConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/AddOrUpdateNodeCopyConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteCopyConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteCopyConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNodeCopyConfigsByCopyLinkId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetNodeCopyConfigsByCopyLinkId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllNodeCopyConfigsByCopyLinkId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllNodeCopyConfigsByCopyLinkId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editWorkflowProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditWorkflowProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateWorkflowOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/UpdateWorkflowOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteWorkflowProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteWorkflowProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllByInformConfigLinkId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetAllByInformConfigLinkId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editNodeInformConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditNodeInformConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteNodeInformConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeleteNodeInformConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editPreProcessorConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditPreProcessorConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPreProcessorConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetPreProcessorConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deletePreProcessorConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/DeletePreProcessorConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editProcessType = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/EditProcessType',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getObject = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetObject',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFormattedResult = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/workflow/GetFormattedResult',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    

})((mabp || (mabp = { })), (angular || undefined));
    
