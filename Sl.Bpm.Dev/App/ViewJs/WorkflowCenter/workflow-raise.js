
(function () {
	angular.module('syspages').controller("workflowRaise", [
		'$scope', 'mabp.app.task', 'workflowModuleTransfer', '$http',
		function ($scope, service, module, $http) {
			var vm = this;

			vm.open = function (wfcd, wfcatcd) {

                var url = window.$oldSystemHost +"/binx/initiate/FlowInitiatePost.aspx?wfcd=" + wfcd + "&wfcatcd=" + wfcatcd;
				$("#modalJump").find("iframe").attr("src", url);
				$("#modalJump").show().addClass("in");
				console.log(wfcd, wfcatcd);
			};

			window.addEventListener("message", function (me) {

				if (me.data === "workflow-center-close") {
					$("#modalJump").removeClass("in").hide();
				}
			}, false);


			return vm;
		}]);
})();