(function () {
	angular.module('syspages').controller("workflowCenter", [
		'$scope', 'mabp.app.task', 'workflowModuleTransfer', '$http',
		function ($scope, service, module, $http) {
			var vm = this;
            var bpmOldBaseUrl = window.$oldSystemHost;
			var isOld = false;
			vm.init = false;
			var lastStatus = { type: null, isOld: null };
			var beforLastStatus = { type: null, isOld: null };


			if ((location.hash || "").length < 2) {
				var links = $(".role_tree ul li").eq(0).find("a");
				if (links.length > 0) {
					var link = links.eq(0);
					link.trigger("click");
					location.hash = link.attr("href");
				}
				else {
					location.hash = "#none";
				}

			}


			function initFilters(type, isOld) {
				if (beforLastStatus.type != type || beforLastStatus.isOld != isOld) {
					beforLastStatus.type = type;
					beforLastStatus.isOld = isOld;
					if (isOld) {
						vm.orderBy = { 3: 'lastdate', 4: 'taskCreateTime', 5: 'maxproctime', 6: 'taskcreatetime', 8: 'taskcreatetime' }[type] || "procrecvtime";
					}
					else {
						vm.orderBy = { 3: 'lastModificationTime' }[type] || "refId";
					}
					vm.filters = [];

				}
			}

			$(window).on("pageChange", function (e, link) {
				var arr = link.split("/");
				if (arr.length > 1) {
					if (arr.length == 3) {

						setTimeout(function () {

							var workflowIds = "";
							var info = arr[1].split("-");
							var type = info[0];
							isOld = info.length > 1;

							if (type.toLocaleLowerCase() === "workflow") {
								workflowIds = arr[2];
							}
							else if (type.toLocaleLowerCase() === "category") {

								workflowIds = getFilters(arr[2]);
							}
							vm.init = true;
							$scope.$apply(function () {
								initFilters(getMenuType(), isOld);
								setFilters("workflowId", workflowIds);
							});

						}, 0);

					}
				}

			});

			$(window).trigger("pageChange", location.hash);



			vm.hideFilters = [];
			function getFilters(id) {
				var info = getInfo();
				var ids = "";
				var match = null;
				for (var i = 0; i < info.length; i++) {
					if (info[i].WfdCategoryId === id) {
						match = info[i];
						break;
					}
				}
				if (match) {
					var idList = [];
					angular.forEach(match.Children, function (item) {
						idList.push(item.WfdWorkflowId);
					});
					ids = idList.join(",");
				}
				return ids;
			}
			function setFilters(name, value) {
				var set = false;
				for (var i = 0; i < vm.hideFilters.length; i++) {
					if (vm.hideFilters[i].name === name) {
						vm.hideFilters[i].value = value;
						set = true;
						break;
					}
				}
				if (!set) {
					vm.hideFilters.push({
						hide: true,
						name: name,
						value: value
					});
				}
			}

			function newWin(url, target,fetures, callback) {
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

			function setHeaderOld(type) {
				vm.filters = [
					{
						name: 'wfname',
						text: '流程名称'
					},
					{
						name: 'tasktopic',
						text: '主题'
					}
				];
				switch (type) {
					case 1:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'username', text: '发起人', sort: 'both' },
							{ name: 'procrecvtime', text: '到达时间', type: 'datetime', sort: 'both' },
							{ name: 'nodeName', text: '步骤名称' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										newWin(bpmOldBaseUrl + "/binx/process/default.aspx?procid=" + item.procid + "&tasksn=" + item.tasksn, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20",reload)
									}
								}
								]
							}
						];
						break;
					case 4:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'taskcreatetime', text: '提交日期', type: 'datetime', sort: 'both' },
							{ name: 'taskstatus', text: '当前处理' },
							{
								text: 'Operation', type: 'buttons', buttons: [
									{
										name: 'openFile',
										class: function () {
											return "icon  icon-folder-open text-warning";
										},
                                        click: function (item, reload) {
											newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20", reload);
										}
									}
								]
							}
						];
						break;
					case 3:
						vm.filters = [
							{
								name: 'wfname',
								text: '流程名称'
							},
							{
								name: 'memo',
								text: '备注'
							},
							{
								name: 'lastdate',
								text: '保存时间',
								type:'datetime'
							}
						];
						vm.header = [
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'lastdate', text: '保存时间', sort: 'both', type: 'datetime' },
							{ name: 'memo', text: '备注', sort: 'both' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										var url = "/binx/post/default.aspx?wfcatcd=" + item.catcd + "&wfcd=" + item.wfcd + "&draft=" + item.id + "&jobid=" + item.jobID;
										newWin(bpmOldBaseUrl + url, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20",reload)
									}
								}
								]
							}
						];
						break;
					case 5:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'maxproctime', text: '处理日期', type: 'datetime', sort: 'both' },
							{ name: 'taskid', text: '当前处理' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20",reload)
									}
								}
								]
							}
						];
						break;
					case 6:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'username', text: '发起人', sort: 'both' },
							{ name: 'taskcreatetime', text: '提交日期', type: 'datetime', sort: 'both' },
							{ name: 'procUserName', text: '步骤名称' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid + "&formfile=" + item.formFile, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20",reload)
									}
								}
								]
							}
						];
						break;
					case 7:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'username', text: '提交者', sort: 'both' },
							{ name: 'taskcreatetime', text: '提交日期', type: 'datetime', sort: 'both' },
							{ name: 'taskid', text: '步骤名称' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20", reload)
									}
								}
								]
							}
						];
						break;
					case 8:
						vm.header = [
							{ name: 'taskno', text: '任务ID', sort: 'both' },
							{ name: 'wfname', text: '流程名称', sort: 'both' },
							{ name: 'tasktopic', text: '主题', sort: 'both' },
							{ name: 'username', text: '提交者', sort: 'both' },
							{ name: 'taskcreatetime', text: '提交日期', type: 'datetime', sort: 'both' },
							{ name: 'taskid', text: '步骤名称' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'openFile',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item,reload) {
										newWin(bpmOldBaseUrl + "/binx/detail/default.aspx?taskid=" + item.taskid, "", "scrollbars=yes, resizable=yes, toolbar=no, menubar=no, location=no, directories=no,width=1200,height=800,top=20,left=20",reload)
									}
								}
								]
							}
						];
						break;
				}


			}
			function setHeaderNew(type) {
				vm.filters = [
					{
						name: 'refId',
						text: 'Sn'
					},
					{
						name: 'areaCode',
						text: 'AreaCode'
					},
					{
						name: 'creator',
						text: 'Creator'
					},
					{
						name: 'topic',
						text: 'Topic'
					}
				];
				switch (type) {
					case 3:
						vm.header = [
							{
								name: 'refId', text: '任务ID', sort: 'both'
							},
							{ name: 'workflowName', text: 'WorkflowName', sort: 'both' },
							{ name: 'topic', text: 'Topic', sort: 'both' },
							{ name: 'lastModificationTime', text: 'ModificationDate', sort: 'both', type: 'datetime' },
							{ name: 'wfdCategoryName', text: 'WorkflowType', sort: 'both' },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'edit',
									class: function (item) {
										return "icon icon-edit";
									},
									click: function (wf, reload) {
										var jobs = [{ jobId: wf.createByJobId }];
										if (wf.procId != null) {
											//单纯保存表单 是无需从草稿箱打开的 这段代码待删除。
											module.approve(wf.appPageId, wf.wfdWorkflowNodeId, wf).then(function () {
                                                reload();
                                                $scope.$apply();
											});
										} else {
											module.openDraft(wf.appPageId, wf.wfdWorkflowNodeId, jobs, wf).then(function () {
                                                reload();
                                                $scope.$apply();
											});
										}
									}
								}]
							}];
						break;
					case 4:
						vm.header = [
							{
								name: 'refId', text: '任务ID', sort: 'both'
							},
							{ name: 'workflowName', text: 'WorkflowName', sort: 'both' },
							{ name: 'topic', text: 'Topic', sort: 'both' },
							{ name: 'creationTime', text: 'CreationDate', sort: 'both', type: 'datetime' },
							{ name: 'taskTitle', text: 'CurrentStatus', render: function (item) { return { 0: item.procUserName, 1: L('TaskFinishStatus'), 7: L('TaskRejectStatus'), 9: L('TaskCanceled') }[item.taskStatus]; } },
							{
								text: 'Operation', type: 'buttons', buttons:
									[
										{
											name: 'star', class: function (item) {
												return item.isMarked ? "icon text-warning icon-star" : "icon text-warning icon-star-empty";
											},
											click: function (item, reload) {
												var status = !item.isMarked;
												service.markTask({ taskId: item.taskId, isMarked: status }).then(function (res) {
													mabp.notify.success(status ? "标记成功" : "取消标记成功");
													item.isMarked = status;
													reload();
												});
											}
										},
										{
											name: 'edit',
											class: function (item) {
												return "icon  icon-folder-open text-warning";
											},
											click: function (item, reload) {
												module.checkout(item.appPageId, null, item).then(function () {
                                                    reload();
                                                    $scope.$apply();
												});
											}
										},
										{
											name: 'recede',
											class: function (item) {
												return item.nextProcId?"fa fa-effect-boris icon icon-history text-danger":"";
											},
											click: function (item, reload) {
												mabp.message.confirm('撤回该任务', null, function (result) {
													if (result)
														service.event_Recede(item).then(function () {
															mabp.notify.success("撤回该任务成功！");
                                                            reload();
														});
												});
											}
										}
									]
							}];
						break;
					case 5:

						vm.header = [
							{
								name: 'refId', text: '任务ID', sort: 'both'
							},
							{ name: 'submitter', text: 'Creator', sort: 'both' },
							{ name: 'workflowName', text: 'WorkflowName', sort: 'both' },
							{ name: 'creationTime', text: 'CreationDate', sort: 'both', type: 'datetime' },
							{ name: 'taskTitle', text: 'CurrentStatus', render: function (item) { return { 0: item.procUserName, 1: L('TaskFinishStatus'), 7: L('TaskRejectStatus'), 9: L('TaskCanceled') }[item.taskStatus]; } },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'star', class: function (item) {
										return item.isMarked ? "icon text-warning icon-star" : "icon text-warning icon-star-empty";
									},
									click: function (item) {
										var status = !item.isMarked;
										service.markTask({ taskId: item.taskId, isMarked: status }).then(function (res) {
											mabp.notify.success(status ? "标记成功" : "取消标记成功");
											item.isMarked = status;
										});
									}
								},
								{
									name: 'pushpin',
									class: function (item) {
										return { 1: 'icon icon-play-circle text-info', 0: 'icon icon-pause text-danger' }[item.isWaiting];
									},
									click: function (item, reload) {
										var status = item.isWaiting === 1 ? 0 : 1;
										service.event_Waiting({ procId: item.procId, isWaiting: status }).then(function () {
											mabp.notify.success(status ? "挂起成功，请到我挂起的流程中查看！" : "启动成功，请到待办流程中处理！");
											item.isWaiting = status;
											reload();
										});
									}

								},
								{
									name: '',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item, reload) {
										module.approve(item.appPageId, item.wfdWorkflowNodeId, item).then(function (result) {
                                            reload();
                                            $scope.$apply();
										});
									}
								}]
							}];
						break;
					default:
						vm.header = [
							{
								name: 'refId', text: '任务ID', sort: 'both'
							},
							{ name: 'workflowName', text: 'WorkflowName', sort: 'both' },
							{ name: 'topic', text: 'Topic', sort: 'both' },
							{ name: 'submitter', text: 'Creator', sort: 'both' },
							{ name: 'recvTime', text: 'ReceiveDate', sort: 'both', type: 'datetime' },
							{ name: 'taskTitle', text: 'CurrentStatus', render: function (item) { return { 0: item.procUserName, 1: L('TaskFinishStatus'), 7: L('TaskRejectStatus'), 9: L('TaskCanceled') }[item.taskStatus]; } },
							{
								text: 'Operation', type: 'buttons', buttons: [{
									name: 'star', class: function (item) {
										return item.isMarked ? "icon text-warning icon-star" : "icon text-warning icon-star-empty";
									},
									click: function (item) {
										var status = !item.isMarked;
										service.markTask({ taskId: item.taskId, isMarked: status }).then(function (res) {
											mabp.notify.success(status ? "标记成功" : "取消标记成功");
											item.isMarked = status;
										});
									}
								},
								{
									name: 'pushpin',
									class: function (item) {
										return { 1: 'icon icon-play-circle text-info', 0: 'icon icon-pause text-danger' }[item.isWaiting];
									},
									click: function (item, reload) {
										var status = item.isWaiting === 1 ? 0 : 1;
										service.event_Waiting({ procId: item.procId, isWaiting: status }).then(function () {
											mabp.notify.success(status ? "挂起成功，请到我挂起的流程中查看！" : "启动成功，请到待办流程中处理！");
											item.isWaiting = status;
											reload();
										});
									}

								},
								{
									name: 'open',
									class: function () {
										return "icon  icon-folder-open text-warning";
									},
									click: function (item, reload) {
										module.approve(item.appPageId, item.wfdWorkflowNodeId, item).then(function (result) {
                                            reload();
                                            $scope.$apply();
										});
									}
								}

								]
							}];
						break;
				}


			}


			function setHeader(type, isOld) {
				if (lastStatus.type != type || lastStatus.isOld != isOld) {
					lastStatus.type = type;
					lastStatus.isOld = isOld;

					isOld ? setHeaderOld(type) : setHeaderNew(type);
				}
			}

			vm.pageChange = function (pageNo, pageSize, callback, info) {


				var type = getMenuType();
				setHeader(type, isOld);
				if (isOld) {
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
				}
				else {
					var reqName = [
						"",//0
						"getPendingHandleTasksDataTable",//1
						"getMyMarkedTasks",//2
						"getMyDraftTasks",//3
						"getMyRaisedTasksDataTable",//4
						"getMyHandledTasksDataTable",//5
						"getMyCopiedTasksDataTable",//6
						"getMyAuthorizedTasks",//7 
						"getMyDelegatedTasks",//8
						"",//9
						"getMyWaitedTasksDataTable"//10
					][type];
					return service[reqName](info).then(function (res) {
						vm.data = res.data || res.model;
						callback(res.totalCount);
					});
				}

			};
		}
	]);
})();