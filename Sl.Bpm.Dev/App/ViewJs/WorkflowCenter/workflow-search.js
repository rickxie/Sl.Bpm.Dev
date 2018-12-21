
(function () {
	angular.module('syspages').controller("workflowSearch", [
		'$scope', 'mabp.app.task', 'workflowModuleTransfer', '$element',
		function ($scope, service, module, $element) {
			var vm = this;
			var list = $($element).find(".dl-menu li");


			function IsMatch(key, val) {
				var isMatch = false || key === "" || key === null;
				var html = (val || '未设置').replace(new RegExp("[" + key.split('').join('][') + "]", "ig"), function (match) {
					isMatch = true;
					return "<b class='text-danger'>" + match + "</b>";
				});
				return isMatch ? html : isMatch;
			}

			$scope.$watch("vm.searchKey", function (val) {
				list.each(function () {
					if (val && val.length) {


						var h3 = $(this).find("h3");
						var mt = IsMatch(val, h3.text());
						if (mt) {
							h3.html(mt);
							$(this).show();
							$(this).find("a").show();
						}
						else {
							var match = false;
							$(this).find("h4").each(function () {
								var span = $(this).find("span");
								var mt = IsMatch(val, span.text());
								if (mt) {
									span.html(mt);
									match = true;
									$(this).parent().show();
									$(this).parents("li").show().find("h3").parent().show();
								}
								else {
									span.html(span.text());
									$(this).parent().hide();
								}

							});
							if (!match) {
								$(this).hide();
							}
						}
					}
					else {
						var h3 = $(this).find("h3");
						h3.html(h3.text());
						$(this).find("h4").each(function () {
							var span = $(this).find("span");
							span.html(span.text());
						});
						$(this).show();
						$(this).find("a").show();
					}


				});
			});
			return vm;
		}]);
})();