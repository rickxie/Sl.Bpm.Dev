angular.module('mabp')
    .service('treeHelper', function () {
    var sv = {};
    //获取面包屑数组
    /*****
    // itemArray 是一组数据  树的数组。 selectedId 是需要选择的id
    // e.g. [ { id: 1, text: 'hello', children: []}, { id: 1, text: 'hello', children: []}]
    *****/
    sv.getBreadcrumb = function(itemArray, selectedId) {
        function findGroupName(itemTree, breadcrumbArray, tierIndex) {

            breadcrumbArray[tierIndex] = itemTree;
            if (itemTree.id === selectedId) {
                breadcrumbArray.splice(tierIndex + 1, breadcrumbArray.length - tierIndex - 1);
                return true;
            }
            tierIndex = tierIndex + 1;
            if (itemTree.children != null) {
                for (var i = 0; i < itemTree.children.length; i++) {
                    var result = findGroupName(itemTree.children[i], breadcrumbArray, tierIndex);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return null;
        };

        function findGroup(items) {

            for (var i = 0; i < items.length; i++) {
                var groupTier = [];
                if (findGroupName(items[i], groupTier, 0)) {
                    return groupTier;
                }
            }
            return "";
        }

        return findGroup(itemArray);
    }

    return sv;

})
