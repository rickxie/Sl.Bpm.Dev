/// <reference path="../lib/angular.js" />
var app = angular.module("app", []);
app.controller("ctrl", ["$scope", function ($scope) {

	$scope.list = null;

	window.codeReload = function () {
		var loading = showLoading("列表更新中...");
		setTimeout(function () {
			
			$scope.loading = true;
			$scope.$apply();
		}, 0);
		
		setTimeout(function () {

			window.external.GetDiffList(function (json) {
				$scope.list = eval('(' + json + ')');
				$scope.loading = false;
				$scope.$apply();
				loading.destroy();
			});

		}, 100);
	};
	codeReload();
	$scope.reload = function () {
		window.location.reload();
	};
	$scope.update = function () {
		try {
			window.external.UpdateCode();
		}
		catch(e){
			alert(e);
		}
	
	};
	$scope.allChecked = true;
	$scope.checkCount = 0;
	$scope.$watch("list", function (list) {
		var flag = true;
		var count = 0;
		angular.forEach(list, function (item) {
			if (!item.Checked) {
				flag = false;
				return false;
			}
			else {
				count++;
			}
		});
		$scope.allChecked = flag;
		$scope.checkCount = count;
	}, true);
	$scope.toogleChecke = function () {
		$scope.allChecked = !$scope.allChecked;

		angular.forEach($scope.list, function (item) {
			item.Checked = $scope.allChecked;
		});
	}
	$scope.checkIn = function () {
		var json = angular.toJson({
			Comment: $scope.comment,
			List: $scope.list
		});
		
		var result = window.external.CheckIn(json);
		if (result === "ok") {
			new $.zui.Messager('代码签入成功', {
				icon:'ok-sign',
				type: 'success' // 定义颜色主题
			}).show();
			$scope.comment = "";
			codeReload();
		}
		else {
			new $.zui.Messager(result, {
				icon:'warning-sign',
				type: 'warning' // 定义颜色主题
			}).show();
			
		}
    };
	$scope.openWin = function (item) {
		try {
			window.external.OpenWin(angular.toJson(item));
		}
		catch (e) {
			alert(e);
		}
	};
	$scope.revert = function (item) {
		window.external.Revert(angular.toJson([item]), function () {});
	};

	function showLoading(msg) {
		var loading = new $.zui.Messager(msg, {
			icon: 'bell',
			time: 0,
			close: false
		});
		loading.show();
		return loading;
	}
	$scope.revertChecked = function () {
		var loading = showLoading("还原中...");
		var arr = [];
		angular.forEach($scope.list, function (item) {
			if (item.Checked) {
				arr.push(item);
			}
		});

		window.external.Revert(angular.toJson(arr), function () {
			loading.destroy();
		});
	};


}]);

app.filter("shortId", function () {
	return function (input) {
		var arr = (input || "").split("-");
		return arr[arr.length - 1];
	};
});
app.directive("tip", [function () {
	return {
		restrict: 'A',
		link: function link(scope, elem, attrs, ctrl) {
			var options = {
				placement: attrs["placement"]||"top",
				tipClass: attrs["tipClass"]
			};
		
			$(elem).tooltip(options);
		}
	};
}]);


