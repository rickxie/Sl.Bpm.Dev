var app = angular.module("app", []);
app.controller("ctrl", ["$scope", function ($scope) {


	//window.onerror = function (e) {

	//	//alert(e);
	//	return false;
	//};
	var vm = $scope;
	var dv;
	var service = window.external;
	var serverCopy = null;
	function reload() {
		try {
			var res = null;
			if (service && service.GetDiff) {
				res = eval("(" + service.GetDiff() + ")");
			}
			else {
				res = {
					"CodeItemId": "a1c335a0-828a-45ac-a799-c66b4193a292",
					"FileName": "\\Data\\data02\\data02.html",
					"LastChangeSetId": "7c0d8162-91d1-4840-81fa-1f03d75f9de0",
					"WorkCopy": "<!-- х??m \\Data\\data02\\data02.html -->\r\n<!--????-->\r\n<fm-form-title sn-number='{{base.snNumber}}' apply-date='{{base.applyDate}}' sub-title='base.title'></fm-form-title>\r\n<!--???х?-->\r\n\r\n<fm-Group-Head class='print-hide' title='{{ base.$pageLang.ApplicantInfo }}'></fm-Group-Head>\r\n\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantName' | translate }}</span>\r\n            <div class='col-xs-4'>\r\n                <div class='input-group' style='width: 100%;'>\r\n                    <span class='form-label'>{{base.applicant.userName}}</span>\r\n                    <span class='input-group-btn' ng-if='!taskid'>\r\n                        <button class='btn btn-default' type='button' ng-click='base.$selectApplicant()'>{{ 'Choose' | translate }}</button>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <!--?????П-->\r\n        <div class='col-xs-12'>\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.applicant.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.contactNumber}}</span></div>\r\n            <!--????Ф-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--???х?-->\r\n<fm-Group-Head title='{{ base.$pageLang.InitiatorInfo }}'></fm-Group-Head>\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorName' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.userName}}</span></div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.initiator.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.contactNumber}}</span></div>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n\t<!--?????2-->\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>",
					"ServerCopy": "<!-- х??m \\Data\\data02\\data02.html -->\r\n<!--????-->\r\n<fm-form-title sn-number='{{base.snNumber}}' apply-date='{{base.applyDate}}' sub-title='base.title'></fm-form-title>\r\n<!--???х?-->\r\n<fm-Group-Head class='print-hide' title='{{ base.$pageLang.ApplicantInfo }}'></fm-Group-Head>\r\n\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantName' | translate }}</span>\r\n            <div class='col-xs-4'>\r\n                <div class='input-group' style='width: 100%;'>\r\n                    <span class='form-label'>{{base.applicant.userName}}</span>\r\n                    <span class='input-group-btn' ng-if='!taskid'>\r\n                        <button class='btn btn-default' type='button' ng-click='base.$selectApplicant()'>{{ 'Choose' | translate }}</button>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <!--?????П-->\r\n        <div class='col-xs-12'>\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.applicant.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.contactNumber}}</span></div>\r\n            <!--????Ф-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--???х?-->\r\n<fm-Group-Head title='{{ base.$pageLang.InitiatorInfo }}'></fm-Group-Head>\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorName' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.userName}}</span></div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.initiator.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.contactNumber}}</span></div>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n\t<!--?????2-->\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>",
					"LastCopy": "<!-- х??m \\Data\\data02\\data02.html -->\r\n<!--????-->\r\n<fm-form-title sn-number='{{base.snNumber}}' apply-date='{{base.applyDate}}' sub-title='base.title'></fm-form-title>\r\n<!--?????1-->\r\n<!--???х?-->\r\n<fm-Group-Head class='print-hide' title='{{ base.$pageLang.ApplicantInfo }}'></fm-Group-Head>\r\n\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantName' | translate }}</span>\r\n            <div class='col-xs-4'>\r\n                <div class='input-group' style='width: 100%;'>\r\n                    <span class='form-label'>{{base.applicant.userName}}</span>\r\n                    <span class='input-group-btn' ng-if='!taskid'>\r\n                        <button class='btn btn-default' type='button' ng-click='base.$selectApplicant()'>{{ 'Choose' | translate }}</button>\r\n                    </span>\r\n                </div>\r\n            </div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <!--?????П-->\r\n        <div class='col-xs-12'>\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.applicant.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.contactNumber}}</span></div>\r\n            <!--????Ф-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'ApplicantDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.applicant.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!--???х?-->\r\n<fm-Group-Head title='{{ base.$pageLang.InitiatorInfo }}'></fm-Group-Head>\r\n<div class='row'>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorName' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.userName}}</span></div>\r\n            <!--??????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmployeeNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.employeeNumber}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDepartment' | translate }}</span>\r\n            <div class='col-xs-10'><span class='form-label'>{{base.initiator.departmentName}}</span></div>\r\n        </div>\r\n    </div>\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorContactNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.contactNumber}}</span></div>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorEmail' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.emailAddress}}</span></div>\r\n        </div>\r\n    </div>\r\n\t<!--?????2-->\r\n    <div class='form-group'>\r\n        <div class='col-xs-12'>\r\n            <!--?????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorMobileNumber' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.mobileNumber}}</span></div>\r\n            <!--???????-->\r\n            <span class='col-xs-2 control-label'>{{ 'InitiatorDirectManager' | translate }}</span>\r\n            <div class='col-xs-4'><span class='form-label'>{{base.initiator.directManagerName}}</span></div>\r\n        </div>\r\n    </div>\r\n</div>",
					"IsConflict": true,
					"Checked": false,
					"IsDeleted": false,
					"MarkAsResolved": false
				};
			}
			serverCopy = res.ServerCopy;
			vm.conflict = res.IsConflict;
			vm.resolved = res.MarkAsResolved;

			if (res.IsConflict) {
				initCompare({
					left: {
						fileContent: res.WorkCopy
					},
					middle: {
						fileExtension: "." + (res.FileName.split(".").pop()),
						fileContent: res.LastCopy
					},
					right: {
						fileContent: res.ServerCopy
					}
				});
			}
			else {
				initCompare({
					left: {
						fileContent: res.LastCopy
					},
					middle: {
						fileExtension: "." + (res.FileName.split(".").pop()),
						fileContent: res.WorkCopy
					},
					right: {
						fileContent: res.ServerCopy
					}
				});
			}

		} catch (e) {
			alert(e);
		}

	}
	reload();

	vm.goNext = function () {
		dv.edit.execCommand("goNextDiff");
	};
	vm.goPrev = function () {
		dv.edit.execCommand("goPrevDiff");
	};

	vm.markAsResolved = function () {
		vm.resolved = true;

		service.MarkAsResolved();
		var cm = dv.edit;
		service.Save(cm.getValue());
	};

	vm.useWorkCopy = function () {
		vm.resolved = true;

		service.MarkAsResolved();
		var val = dv.left.orig.getValue();
		dv.edit.setValue(val);
	};
	vm.useServerCopy = function () {
		vm.resolved = true;

		service.MarkAsResolved();
		var val = dv.right.orig.getValue();
		dv.edit.setValue(val);
	};
	function initUI(mode, value, orig, origLeft) {
		if (value == null) return;
		var target = $("#view").html("")[0];
		return CodeMirror.MergeView(target, {
			value: value,
			revertButtons: true,
			origLeft: origLeft,
			orig: orig,
			lineNumbers: true,
			mode: mode,
			theme: 'visual-studio-2012',
			highlightDifferences: true,
			//connect: "align",
			readOnly: false,
			lineSeparator: '\r\n',
			collapseIdentical: false
		});
	}

	function toggleDifferences() {
		dv.setShowDifferences(highlight = !highlight);

	}
	function initCompare(res) {
		if (res.middle) {
			if (!res.right) {
				res.right = {
					fileContent: '',
					comment: 'δ??',
					id: '?',
					version: '?'
				};

			}
			var mode = "text/html";
			switch (res.middle.fileExtension) {
				case ".js":
					mode = "text/javascript";
					break;
				case ".css":
					mode = "text/css";
					break;
				case ".html":
					mode = "text/html";
					break;
				case ".cs":
					mode = "text/x-csharp";
					break;
			}


			vm.left = res.left;
			vm.right = res.right;
			vm.middle = res.middle;

			vm.leftComment = vm.left.comment || vm.left.changeSetComment;
			vm.rightComment = vm.right.comment || vm.right.changeSetComment;
			vm.middleComment = vm.middle.comment || vm.middle.changeSetComment;

			vm.fileName = vm.middle.directory + "\\" + vm.middle.fileName;

			compare(vm.middle.fileContent, vm.right.fileContent, vm.left.fileContent, mode);

		}
	}

	function compare(val, valA, valB, mode) {
		dv = initUI(mode, val, valA, valB);
		dv.edit.on("change", function (cm) {
			service.Save(cm.getValue());
		});
	}



	function mergeViewHeight(mergeView) {
		function editorHeight(editor) {
			if (!editor) return 0;
			return editor.getScrollInfo().height;
		}
		return Math.max(editorHeight(mergeView.leftOriginal()),
			editorHeight(mergeView.editor()),
			editorHeight(mergeView.rightOriginal()));
	}

	function resize(mergeView) {
		var height = mergeViewHeight(mergeView);
		for (; ;) {
			if (mergeView.leftOriginal())
				mergeView.leftOriginal().setSize(null, height);
			mergeView.editor().setSize(null, height);
			if (mergeView.rightOriginal())
				mergeView.rightOriginal().setSize(null, height);

			var newHeight = mergeViewHeight(mergeView);
			if (newHeight >= height) break;
			else height = newHeight;
		}
		mergeView.wrap.style.height = height + "px";
	}

}]);
