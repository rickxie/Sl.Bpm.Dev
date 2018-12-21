

(function(mabp, angular) {

    if (!angular)
    {
        return;
    }
    var module = angular.module('mabp');

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
            this.getAllMappingColumns = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllMappingColumns',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editMappingColumn = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditMappingColumn',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getMappingFileConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetMappingFileConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editMappingFileConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditMappingFileConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllInterfaceServerConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/GetAllInterfaceServerConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editInterfaceServerConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/table/EditInterfaceServerConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
    };
    }
    ]);
    
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
    
    module.factory('mabp.app.module', [
    '$http', function($http) {
    return new function()
    {
            this.getBatchResult = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetBatchResult',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateModuleCategoryOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/UpdateModuleCategoryOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateModuleCategoryItemOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/UpdateModuleCategoryItemOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.loadModuleCategoryWithPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/LoadModuleCategoryWithPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.loadModuleCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/LoadModuleCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.loadModuleCategoryMap = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/LoadModuleCategoryMap',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editModuleCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/EditModuleCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteModuleCategory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/DeleteModuleCategory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addOrDeleteModuleCategoryMap = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/AddOrDeleteModuleCategoryMap',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getSubPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetSubPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/EditModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.updateModuleOrder = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/UpdateModuleOrder',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.switchModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/SwitchModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/DeleteModule',
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
            this.getPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getModuleEntryPage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetModuleEntryPage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPagesForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetPagesForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEmptyPagesForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetEmptyPagesForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removePageForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/RemovePageForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addPageForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/AddPageForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editModulePageRight = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/EditModulePageRight',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getModulePageRights = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetModulePageRights',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getModulePageNodes = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetModulePageNodes',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getPageLanguages = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetPageLanguages',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteModulePageRight = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/DeleteModulePageRight',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getNodePageRights = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetNodePageRights',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getWorkflowForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetWorkflowForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getEmptyWorkflowForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetEmptyWorkflowForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.addWorkflowForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/AddWorkflowForModule',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.removeWorkflowForModule = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/RemoveWorkflowForModule',
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
            this.getAllFavouriteModules = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/module/GetAllFavouriteModules',
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
    };
    }
    ]);
    
    module.factory('mabp.app.bpm', [
    '$http', function($http) {
    return new function()
    {
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
            this.getAllInformTemplates = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllInformTemplates',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editInformTemplate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditInformTemplate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteInformTemplate = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteInformTemplate',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllInterfaceConfigs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllInterfaceConfigs',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editInterfaceConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditInterfaceConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteInterfaceConfig = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteInterfaceConfig',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getAllIntegrations = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetAllIntegrations',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editIntegration = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditIntegration',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteIntegration = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/DeleteIntegration',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getIntegrationFileByConfigId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetIntegrationFileByConfigId',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editIntegrationFile = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/EditIntegrationFile',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.readServiceXml = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/ReadServiceXml',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getIntegrationServiceByConfigId = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/bpm/GetIntegrationServiceByConfigId',
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
            this.reloadPermissionCache = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/ReloadPermissionCache',
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
            this.getUserCompanyPermission = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/permission/GetUserCompanyPermission',
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
            this.editBpmLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/EditBpmLanguage',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.insertBpmLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/InsertBpmLanguage',
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
            this.deleteBpmLanguage = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/DeleteBpmLanguage',
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
            this.getTextLangs = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/system/GetTextLangs',
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
    };
    }
    ]);
    
    module.factory('mabp.app.report', [
    '$http', function($http) {
    return new function()
    {
            this.getAllReport = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/report/GetAllReport',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.editReport = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/report/EditReport',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.deleteReport = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/report/DeleteReport',
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
            this.getFormActionButtons = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetFormActionButtons',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
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
            this.getFormHeaderInfo = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/taskRead/GetFormHeaderInfo',
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
            this.changeProcessor = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/ChangeProcessor',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.clearToProposer = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/ClearToProposer',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.backToProposer = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/BackToProposer',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.backToAnyStep = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/BackToAnyStep',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.backToLastNode = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/BackToLastNode',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.activeTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/ActiveTask',
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
            this.markTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/MarkTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getFormTask = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetFormTask',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getProcHistory = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetProcHistory',
                      method: 'POST',
                      data:JSON.stringify(input)
                }, httpParams));
            };
            this.getExpectApprover = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetExpectApprover',
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
            this.getProcHistoryForForm = function(input, httpParams) {
            return $http(angular.extend({ 
                      abp: true,
                      url: mabp.appPath + 'api/task/GetProcHistoryForForm',
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
    };
    }
    ]);
    

})((mabp || (mabp = { })), (angular || undefined));
    
