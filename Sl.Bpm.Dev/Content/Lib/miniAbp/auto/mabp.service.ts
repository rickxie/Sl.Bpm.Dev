
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { BaseService, AjaxResult } from './base.service';

 @Injectable()
 export class TableService extends BaseService {
 GetAllPagedBusinessTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllPagedBusinessTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllBusinessTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllBusinessTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllBusinessTableTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllBusinessTableTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBusinessTablesByParentTableId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetBusinessTablesByParentTableId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBusinessTablesByTableId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetBusinessTablesByTableId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditBusinessTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditBusinessTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBusinessTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/DeleteBusinessTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckHasUnAppliedHistory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/CheckHasUnAppliedHistory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllBusinessTableColumns(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllBusinessTableColumns', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditBusinessTableColumn(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditBusinessTableColumn', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBusinessTableColumn(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/DeleteBusinessTableColumn', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateBusinessTableColumnDisplayOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/UpdateBusinessTableColumnDisplayOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllViewTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllViewTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetViewTableById(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetViewTableById', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditViewTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditViewTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteViewTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/DeleteViewTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllViewTableColumns(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllViewTableColumns', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditViewTableColumn(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditViewTableColumn', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteViewTableColumn(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/DeleteViewTableColumn', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWfBusinessTableAndColumns(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetWfBusinessTableAndColumns', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetInformColums(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetInformColums', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ApplyToDatabase(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/ApplyToDatabase', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateViewTableColumnDisplayOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/UpdateViewTableColumnDisplayOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllTablesAndViews(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllTablesAndViews', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllMappingColumns(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllMappingColumns', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditMappingColumn(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditMappingColumn', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMappingFileConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetMappingFileConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditMappingFileConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditMappingFileConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllInterfaceServerConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/GetAllInterfaceServerConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditInterfaceServerConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Table/EditInterfaceServerConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class ChartService extends BaseService {
 GetChartSysData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartSysData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChartNowSysData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartNowSysData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChartWfData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartWfData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWfId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetWfId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChartWfnData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartWfnData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChartWfDataByUserId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartWfDataByUserId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChartTskAvgHourByUserId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetChartTskAvgHourByUserId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllWorkflows(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetAllWorkflows', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWdProcess(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/GetWdProcess', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateWfStandardTime(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Chart/UpdateWfStandardTime', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class ModuleService extends BaseService {
 GetBatchResult(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetBatchResult', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateModuleCategoryOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/UpdateModuleCategoryOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateModuleCategoryItemOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/UpdateModuleCategoryItemOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 LoadModuleCategoryWithPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/LoadModuleCategoryWithPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 LoadModuleCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/LoadModuleCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 LoadModuleCategoryMap(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/LoadModuleCategoryMap', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditModuleCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/EditModuleCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteModuleCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/DeleteModuleCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddOrDeleteModuleCategoryMap(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/AddOrDeleteModuleCategoryMap', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetAllModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSubPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetSubPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/EditModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateModuleOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/UpdateModuleOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SwitchModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/SwitchModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/DeleteModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Invoke(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/Invoke', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 InvokeDownload(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/InvokeDownload', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetModuleEntryPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetModuleEntryPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPagesForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetPagesForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEmptyPagesForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetEmptyPagesForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RemovePageForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/RemovePageForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddPageForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/AddPageForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditModulePageRight(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/EditModulePageRight', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetModulePageRights(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetModulePageRights', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetModulePageNodes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetModulePageNodes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPageLanguages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetPageLanguages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteModulePageRight(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/DeleteModulePageRight', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNodePageRights(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetNodePageRights', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflowForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetWorkflowForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEmptyWorkflowForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetEmptyWorkflowForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddWorkflowForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/AddWorkflowForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RemoveWorkflowForModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/RemoveWorkflowForModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SetFavouriteModule(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/SetFavouriteModule', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllFavouriteModules(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetAllFavouriteModules', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetViewTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetViewTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetViewOne(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetViewOne', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetChooseTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetChooseTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSingleGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetSingleGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetGroups(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetGroups', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobLevelEnumNameByValue(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetJobLevelEnumNameByValue', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPageBasicDataAndViewData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetPageBasicDataAndViewData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSql(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetSql', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllTableName(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetAllTableName', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllColumnName(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetAllColumnName', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMySubbmitterAgent(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Module/GetMySubbmitterAgent', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class BpmService extends BaseService {
 GetAllEnterprise(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllEnterprise', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllEnterpriseUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllEnterpriseUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEnterprise(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditEnterprise', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteEnterprise(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteEnterprise', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEnterpriseUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditEnterpriseUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteEnterpriseUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteEnterpriseUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEnterprise(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetEnterprise', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSettings(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSettings', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSyncConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSyncConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateSyncConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/UpdateSyncConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 JobUserToGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/JobUserToGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 JobGroupToUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/JobGroupToUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetGroupTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetGroupTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedGroupTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSelectedGroupTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobTreeAndUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobTreeAndUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobToUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobToUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllJobToUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllJobToUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFilterJobUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetFilterJobUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSelectedJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedJobUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSelectedJobUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobTreeUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobTreeUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobTreeByJobId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobTreeByJobId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 MoveNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/MoveNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 JobUnBindGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/JobUnBindGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 JobBindGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/JobBindGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 HasChildNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/HasChildNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateJob(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/UpdateJob', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SelectJob(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/SelectJob', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNoAssignedGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetNoAssignedGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetGroups(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetGroups', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetUserJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedUserJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSelectedUserJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobsFromUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetJobsFromUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserAgent(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetUserAgent', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserAgentBySuperAdmin(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetUserAgentBySuperAdmin', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAgentInfo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAgentInfo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditAgent(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditAgent', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteAgent(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteAgent', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveSettings(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/SaveSettings', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllMessageSettingByEnterpriseId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllMessageSettingByEnterpriseId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEnterpriseRole(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditEnterpriseRole', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllRoles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllRoles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteRole(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteRole', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteRoleJob(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteRoleJob', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveRoleJob(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/SaveRoleJob', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveRoleJobArea(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/SaveRoleJobArea', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllRoleJob(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllRoleJob', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 BuildRoleTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/BuildRoleTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetRoleTree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetRoleTree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedRoleJobs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetSelectedRoleJobs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllAppPages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllAppPages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPagesByParentPageId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetPagesByParentPageId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetDatatable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetDatatable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllForm(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllForm', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditAppPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditAppPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteAppPage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteAppPage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllInformTemplates(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllInformTemplates', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditInformTemplate(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditInformTemplate', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteInformTemplate(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteInformTemplate', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllInterfaceConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllInterfaceConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditInterfaceConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditInterfaceConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteInterfaceConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteInterfaceConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllIntegrations(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetAllIntegrations', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditIntegration(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditIntegration', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteIntegration(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteIntegration', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetIntegrationFileByConfigId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetIntegrationFileByConfigId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditIntegrationFile(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditIntegrationFile', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ReadServiceXml(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/ReadServiceXml', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetIntegrationServiceByConfigId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetIntegrationServiceByConfigId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetGroupExtension(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetGroupExtension', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditGroupExtension(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/EditGroupExtension', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteGroupExtension(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/DeleteGroupExtension', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetGroupExtensionByAreaCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Bpm/GetGroupExtensionByAreaCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class EmailService extends BaseService {
 MailTo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Email/MailTo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class ImportExportService extends BaseService {
 ExportWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/ImportExport/ExportWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ImportWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/ImportExport/ImportWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class DataService extends BaseService {
 GetFormData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Data/GetFormData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Data/SaveBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Data/DeleteBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class EnterpriseInfoSyncService extends BaseService {
 InitAccessIdValidate(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/InitAccessIdValidate', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateAccessIdValidate(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/UpdateAccessIdValidate', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 InitializeConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/InitializeConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflows(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetWorkflows', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedWorkflows(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetSelectedWorkflows', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SyncWorkflows(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/SyncWorkflows', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflowShowList(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetWorkflowShowList', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBusinessTables(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetBusinessTables', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SyncBusinessTables(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/SyncBusinessTables', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedBusinessTables(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetSelectedBusinessTables', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBusinessTableShowList(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetBusinessTableShowList', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormPages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetFormPages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetSelectedFormPages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetSelectedFormPages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SyncFormPages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/SyncFormPages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormPageShowList(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/EnterpriseInfoSync/GetFormPageShowList', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class FileService extends BaseService {
 UploadFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/UploadFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 MakeDir(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/MakeDir', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteFile(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/DeleteFile', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckDir(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/CheckDir', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetTaskFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/GetTaskFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetTaskLinkedFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/GetTaskLinkedFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetDraftFile(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/GetDraftFile', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AdvancedUploadFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/AdvancedUploadFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckBaseConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/CheckBaseConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckColumnConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/CheckColumnConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 PrepareAdvanceImportData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/PrepareAdvanceImportData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DownloadView(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/DownloadView', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetCodeFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/GetCodeFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateCodeFile(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/UpdateCodeFile', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RefreshAllFiles(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/RefreshAllFiles', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DownloadMergeExcel(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/DownloadMergeExcel', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Zip(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/Zip', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserFilesByUserId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/GetUserFilesByUserId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateUserFileDownloadTimes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/UpdateUserFileDownloadTimes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 InsertJobConvertQueueAndUserFile(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/InsertJobConvertQueueAndUserFile', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DownloadBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/File/DownloadBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class PermissionService extends BaseService {
 SavePermissionGroupControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/SavePermissionGroupControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteControlGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/DeleteControlGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ReloadPermissionCache(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/ReloadPermissionCache', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserPermissions(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetUserPermissions', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserPermissionsByAccount(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetUserPermissionsByAccount', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllPermissions(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetAllPermissions', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllKeys(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetAllKeys', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddOrUpdatePermissionGroupControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/AddOrUpdatePermissionGroupControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddAndGetGroupControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/AddAndGetGroupControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RemovePermissionGroupControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/RemovePermissionGroupControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllPermissionControlGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetAllPermissionControlGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPermissionControlGroupByEntityId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetPermissionControlGroupByEntityId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddOrUpdatePermissionGroupControlItem(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/AddOrUpdatePermissionGroupControlItem', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RemovePermissionGroupControlItem(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/RemovePermissionGroupControlItem', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllPermissionControlGroupItem(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetAllPermissionControlGroupItem', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllPermissionControlGroupItem(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetAllPermissionControlGroupItem', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflowPermission(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetWorkflowPermission', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteWorkflowControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/DeleteWorkflowControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveWorkflowControl(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/SaveWorkflowControl', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddOrUpdatePermission(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/AddOrUpdatePermission', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserCompanyPermission(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Permission/GetUserCompanyPermission', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class SystemService extends BaseService {
 GetUserInfo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetUserInfo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateActiveUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/UpdateActiveUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SendPhoneCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/SendPhoneCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 RegisterUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/RegisterUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SendAutoLoginEmail(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/SendAutoLoginEmail', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ResetValidationCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ResetValidationCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ResetLogin(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ResetLogin', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/UpdateUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdatePassword(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/UpdatePassword', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ResetAppUserAccessId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ResetAppUserAccessId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllLanguage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllLanguage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckPassword(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/CheckPassword', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SendBingdingPhoneCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/SendBingdingPhoneCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SendBingdingEmailCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/SendBingdingEmailCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 CheckValidationCode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/CheckValidationCode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ConfirmBingding(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ConfirmBingding', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UnBingding(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/UnBingding', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEnums(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetEnums', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetLangs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetLangs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditLang(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/EditLang', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ClearEnterpriseLangs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ClearEnterpriseLangs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditBpmLanguage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/EditBpmLanguage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 InsertBpmLanguage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/InsertBpmLanguage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllEntityLanguages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllEntityLanguages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBpmLanguage(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/DeleteBpmLanguage', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEntityCurrentLanguages(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetEntityCurrentLanguages', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetTextLangs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetTextLangs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ImportBpmLangs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ImportBpmLangs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllEnumsByName(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllEnumsByName', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllEnums(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllEnums', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEnumName(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetEnumName', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEnum(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/EditEnum', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteEnum(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/DeleteEnum', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ClearEnterpriseEnums(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ClearEnterpriseEnums', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllBasicDataTypes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllBasicDataTypes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditBasicDataType(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/EditBasicDataType', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBasicDataType(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/DeleteBasicDataType', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetAllBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetBreadCrumbData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetBreadCrumbData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetEntireTreeBasicData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetEntireTreeBasicData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditBasicDataConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/EditBasicDataConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteBasicDataConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/DeleteBasicDataConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateBasicDataOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/UpdateBasicDataOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ImportBasicDataConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/ImportBasicDataConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetDateTimeNow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/System/GetDateTimeNow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class ReportService extends BaseService {
 GetAllReport(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Report/GetAllReport', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditReport(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Report/EditReport', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteReport(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Report/DeleteReport', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class TaskReadService extends BaseService {
 GetFormActionButtons(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetFormActionButtons', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPreProcessor(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetPreProcessor', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetHandledNodes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetHandledNodes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormHeaderInfo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetFormHeaderInfo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetDraftFormHeaderInfo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetDraftFormHeaderInfo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserInfo(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/TaskRead/GetUserInfo', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class TaskService extends BaseService {
 GetPendingHandleTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetPendingHandleTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPendingReadTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetPendingReadTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPendingReadTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetPendingReadTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdatePendingReadTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/UpdatePendingReadTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdatePendingReadTask(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/UpdatePendingReadTask', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetModuleCountsForType(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetModuleCountsForType', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetColumnConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetColumnConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyMarkedTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyMarkedTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyDraftTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyDraftTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyHandledTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyHandledTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyRaisedTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyRaisedTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyWaitedTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyWaitedTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyCopiedTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyCopiedTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyCopiedTasksDataTable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyCopiedTasksDataTable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyAuthorizedTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyAuthorizedTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyDelegatedTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyDelegatedTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetMyAdvancedTasks(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetMyAdvancedTasks', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Submit(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Submit', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Agree(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Agree', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_AdditionalSigner(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_AdditionalSigner', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Reject(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Reject', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Delete(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Delete', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_RecedeToProposer(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_RecedeToProposer', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_TurnOver(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_TurnOver', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Cancel(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Cancel', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_RecedeToPreviousStep(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_RecedeToPreviousStep', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Copy(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Copy', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_SaveToDraft(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_SaveToDraft', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_DeleteDraft(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_DeleteDraft', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_SaveToTemplate(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_SaveToTemplate', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_SaveForm(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_SaveForm', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_RecedeToAnyStep(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_RecedeToAnyStep', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_RecedeToSepcificStep(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_RecedeToSepcificStep', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Recede(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Recede', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetUserLastProc(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetUserLastProc', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 Event_Waiting(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/Event_Waiting', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ChangeProcessor(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/ChangeProcessor', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ClearToProposer(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/ClearToProposer', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 BackToProposer(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/BackToProposer', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 BackToAnyStep(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/BackToAnyStep', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 BackToLastNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/BackToLastNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ActiveTask(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/ActiveTask', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 BackToNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/BackToNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 MarkTask(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/MarkTask', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormTask(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetFormTask', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetProcHistory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetProcHistory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetExpectApprover(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetExpectApprover', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetHandledNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetHandledNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetTopHandleProcInTask(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetTopHandleProcInTask', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetProcHistoryForForm(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Task/GetProcHistoryForForm', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class UserService extends BaseService {
 ClearEnterpriseUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/User/ClearEnterpriseUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ClearCurrentAppEnterpriseUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/User/ClearCurrentAppEnterpriseUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormUser(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/User/GetFormUser', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetJobUsers(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/User/GetJobUsers', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetCurrentUserUserJobGroup(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/User/GetCurrentUserUserJobGroup', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
 @Injectable()
 export class WorkflowService extends BaseService {
 GetAllCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteCategory(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteCategory', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllCategories(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllCategories', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllAccessCategories(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllAccessCategories', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllWorkflows(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllWorkflows', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 ChargeInformAndColumnLinkId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/ChargeInformAndColumnLinkId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllWorkflowVariable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllWorkflowVariable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditWorkflowVariable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditWorkflowVariable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteWorkflowVariable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteWorkflowVariable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflow(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetWorkflow', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateZoom(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/UpdateZoom', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetLink(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetLink', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveSingleLink(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/SaveSingleLink', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveLink(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/SaveLink', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteLink(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteLink', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNode(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetNode', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 SaveNodeData(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/SaveNodeData', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPageByNodeId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetPageByNodeId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetOtherStepNodes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetOtherStepNodes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetWorkflowActions(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetWorkflowActions', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNodeActions(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetNodeActions', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditActionEnable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditActionEnable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditActionLang(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditActionLang', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditActionReturnToNodes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditActionReturnToNodes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteActionReturnToNodes(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteActionReturnToNodes', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditNodeAction(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditNodeAction', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditNodeActions(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditNodeActions', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEntryEnable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditEntryEnable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditEntryCondition(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditEntryCondition', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditJumpTypeBinary(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditJumpTypeBinary', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditJumpNodeId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditJumpNodeId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditExamineEnable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditExamineEnable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditExamineStandardTime(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditExamineStandardTime', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditAutoHandle(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditAutoHandle', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditIsOvertimeInformEnable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditIsOvertimeInformEnable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditOvertimeBeginTime(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditOvertimeBeginTime', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditOvertimeIntervalTime(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditOvertimeIntervalTime', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditIsOvertimeActionEnable(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditIsOvertimeActionEnable', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditOvertimeActionTime(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditOvertimeActionTime', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditOvertimeActionType(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditOvertimeActionType', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNodeCopys(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetNodeCopys', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 AddOrUpdateNodeCopyConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/AddOrUpdateNodeCopyConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteCopyConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteCopyConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetNodeCopyConfigsByCopyLinkId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetNodeCopyConfigsByCopyLinkId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllNodeCopyConfigsByCopyLinkId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllNodeCopyConfigsByCopyLinkId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetProcessor(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetProcessor', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditWorkflowProcessor(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditWorkflowProcessor', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateWorkflowOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/UpdateWorkflowOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteWorkflowProcessor(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteWorkflowProcessor', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllByInformConfigLinkId(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllByInformConfigLinkId', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditNodeInformConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditNodeInformConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteNodeInformConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteNodeInformConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditPreProcessorConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditPreProcessorConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetPreProcessorConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetPreProcessorConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeletePreProcessorConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeletePreProcessorConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditProcessType(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditProcessType', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetObject(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetObject', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetFormattedResult(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetFormattedResult', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 EditColumnConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/EditColumnConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 GetAllColumnConfigs(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/GetAllColumnConfigs', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 DeleteColumnConfig(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/DeleteColumnConfig', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 UpdateColumnConfigDisplayOrder(input: any): Promise<any> {
    let request = { url: this.BaseUrl + '/api/Workflow/UpdateColumnConfigDisplayOrder', params: input, options: {} };
    request = this.HandleRequest(request);
    return new Promise((resolve, reject) => {
    const p = { resolve: resolve, reject: reject };
    this.http.post(request.url, request.params, request.options)
    .toPromise()
    .then(response => {
         this.HandleResponse(response, p);
    })
   .catch( (ex) => { this.handleError(ex, p); });
    });
}
 }
