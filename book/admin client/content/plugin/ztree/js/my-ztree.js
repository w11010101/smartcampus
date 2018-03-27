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
    {
        name: "总裁办公室"
    },
    {
        name: "发展研究院",
        isParent: true,
        children:[
            {
                name: "发展研究院1",
                children:[
                    {
                        name:"纪律部1"
                    }                

                ]
            },
            {
                name: "发展研究院2",
                children:[
                    {
                        name:"纪律部2"
                    }                
                    
                ]
            },
            {
                name: "发展研究院3",
                children:[
                    {
                        name:"纪律部3"
                    }                
                    
                ]
            },
            {
                name: "发展研究院4",
                children:[
                    {
                        name:"纪律部4"
                    }                
                    
                ]
            }
            
        ]
    },
    {
        name: "治理中心",
        isParent: true,
        children: [
            {
                name: "组织部",
                isParent: true,
                children: [
                    {
                        name: "部门1",
                        children: [
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
                        children: [
                            {
                                name: "子部门21",
                            },
                            {
                                name: "子部门22",
                            },
                            {
                                name: "子部门23",
                            }
 
                        ]
                    },
                    {
                        name: "部门3",
                        children: [
                            {
                                name: "子部门31",
                            },
                            {
                                name: "子部门32",
                            },
                            {
                                name: "子部门33",
                            }
 
                        ]
                    }
                ]
            },
            {
                name: "资本经营部"
            },
        ]
    },
    {
        name: "资本经营中心",
        isParent: true
    },
    {
        name: "2c业务发展中心",
        isParent: true
    },
 
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

var treeObj = {
    level:'新中信集团',   
}
function beforeExpand(treeId, treeNode) {
    console.log('beforeExpand')
    var parent = treeNode.getParentNode();
    if(parent){
        treeObj["level"+parent.level] = parent.name;
        console.log(treeObj);
    }
    setBreadcrumbFn(treeNode,treeObj,$('.container-box .breadcrumb'));
}
function beforeClick(treeId, treeNode) {

    var zTree = $.fn.zTree.getZTreeObj("treeDemo");      
    zTree.expandNode(treeNode);
    $("#"+treeNode.tId).toggleClass("active");
    // 获取父级
    var parent = treeNode.getParentNode();
    if(parent){
        treeObj["level"+parent.level] = parent.name;
        console.log(treeObj);
    }
    setBreadcrumbFn(treeNode,treeObj,$('.container-box .breadcrumb'));
    return true;
}
$(document).ready(function() {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);


});

function expandNode(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes();
    for (var i=0, l=nodes.length; i<l; i++) {
        zTree.setting.view.fontCss = {};
        zTree.expandNode(nodes[i], false, true, null);
    }

}