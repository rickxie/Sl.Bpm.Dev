
(function () {
	angular.module('syspages').controller("workflowAdvancedSearch", ['$scope', '$http', 'workflowModuleTransfer', function ($scope, $http, module) {
		var vm = this;
		var bpmOldBaseUrl = window.$oldSystemHost;
		function newWin(url, target, fetures, callback) {
			var win = window.open(url, target, fetures);
			var timer = setInterval(function () {
				if (win.closed) {
					clearInterval(timer);
					if (typeof (callback) === "function") {
						callback();
						$scope.$apply();
					}
				}
			}, 1000);
		}

		vm.pageChange = function (pageNo, pageSize, callback, info) {

			var type = getMenuType();
			info.type = type;
			return $http({
				method: "POST",
				url: "/Home/ListWorkflow",
				data: info
			}).then(function (res) {
				var data = res.data;
				vm.data = data.data;
				callback(data.totalCount);
			});
		};
		vm.filters = [
			{
				name: 'refId',
				text: 'Sn'
			},
			{
				name: 'workflowName',
				text: '流程名称'
			}
			,
			{
				name: 'submitter', text: '创建人'
			}
			,
			{
				name: 'creationTime', text: '申请时间', sort: 'both', type: 'datetime'
			}
		];
		vm.header = [
			{
				name: 'refId', text: '任务ID', sort: 'both'
			},
			{
				name: 'workflowName', text: '流程名称', sort: 'both'
			}
			,
			{
				name: 'wfdCategoryName', text: '流程分类', sort: 'both'
			}
			,
			{
				name: 'code', text: '流程代码', sort: 'both'
			}
			,
			{
				name: 'submitter', text: '创建人', sort: 'both'
			}
			,
			{
				name: 'creationTime', text: '申请时间', sort: 'both', type: 'datetime'
			}
			,
			{
				name: 'procStatus', text: '当前状态', sort: 'both', render: function (item) { return { 0: item.procUserName, 1: L('TaskFinishStatus'), 7: L('TaskRejectStatus'), 9: L('TaskCanceled') }[item.taskStatus]; } 
			},
			{
				text: 'Operation', type: 'buttons', buttons: [{
					name: 'openFile',
					class: function () {
						return "icon  icon-folder-open text-warning";
					},
					click: function (item, reload) {
						
						if (item.isOld) {
							newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid , "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20", reload)
						}
						else {
							module.approve(item.appPageId, item.wfdWorkflowNodeId, item).then(function (result) {
								reload();
								$scope.$apply();
							});
						}
					}
				}
				]
			}
		
		];
		vm.orderBy = "refId";
		vm.data = [];
		return vm;
	}]);
})();