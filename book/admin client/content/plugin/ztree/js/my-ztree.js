var curMenu = null,
    zTree_Menu = null;
var setting = {
    view: {
        showLine: false,
        showIcon: false,
        selectedMulti: false,
        dblClickExpand: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        beforeExpand:beforeExpand
    }
};
var zNodes = [
    { name: "总裁办公室", isParent: true },
    { name: "发展研究院", isParent: true },
    { name: "治理中心", isParent: true,
        children:[
            { name: "组织部",
                children:[
                    {
                        name: "部门1",
                        children:[
                            {
                                name: "子部门1",
                            },
                            {
                                name: "子部门2",
                            },
                            {
                                name: "子部门3",
                            }

                        ]
                    },
                    {
                        name: "部门2",
                    },
                    {
                        name: "部门3",
                    }
                ]
            },
            { name: "资本经营部" },
        ]
    },
    { name: "资本经营中心", isParent: true },
    { name: "2c业务发展中心", isParent: true },

];

function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);

    if (treeNode.level > 1) {
        // var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
        // switchObj.before(spaceStr);
    }
}
// 通讯录 列表点击事件的回调
var treeArr = [ '新中信集团'];
function beforeExpand(treeId, treeNode) {
    var parent = treeNode.getParentNode();
    if(parent){
        if($.inArray(parent.name,treeArr)<0){
            treeArr.push(parent.name);
        }
    }
    setBreadcrumbFn(treeNode,treeArr,$('.container-box .breadcrumb'));
}
function beforeClick(treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");      
    zTree.expandNode(treeNode);
    $("#"+treeNode.tId).toggleClass("active");
    // 获取父级
    var parent = treeNode.getParentNode();
    if(parent){
        if($.inArray(parent.name,treeArr)<0){
            treeArr.push(parent.name);
        }
    }
    setBreadcrumbFn(treeNode,treeArr,$('.container-box .breadcrumb'));
    return true;
}
$(document).ready(function() {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);


});

