var curMenu = null,
    zTree_Menu = null;
var setting = {
    view: {
        showLine: false,
        selectedMulti: false,
        dblClickExpand: false,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
    }
}
var zNodes = [{
        name: "父节点1 - 展开",
        
        children: [{
                name: "父节点11 - 折叠",
                children: [
                    { 
                     name: "父节点icon",
                     children:[
                      {
                       name: "叶子节点icon",
                       icon:"../../content/common/img/header.png"
                      },
                      {
                       name: "叶子节点icon",
                       icon:"../../content/common/img/header.png"
                      },
                      {
                       name: "父节点adsadsf",
                       children:[
                        {
                         name: "叶子节adfadsfasd",
                         icon:"../../content/common/img/header.png"
                        },
                        {
                         name: "叶子节adfadsfasd",
                         icon:"../../content/common/img/header.png"
                        },
                       ]
                      }
                     ]
                 },
                    { 
                     name: "叶子节点112",
                  icon:"../../content/common/img/header.png"
                 },
                    { name: "叶子节点113" ,
                     icon:"../../content/common/img/header.png"
                 },
                ]
            },
            {
                name: "父节点12 - 折叠",
                children: [
                    { name: "叶子节点121",icon:"../../content/common/img/header.png" },
                    { name: "叶子节点122",icon:"../../content/common/img/header.png" },
                    { name: "叶子节点123",icon:"../../content/common/img/header.png" },
                    { name: "叶子节点124",icon:"../../content/common/img/header.png" }
                ]
            },
            { name: "父节点13 - 没有子节点", isParent: true },
            { 
             name: "叶子节点121234",
             icon:"../../content/common/img/header.png"
         },
        ]
    },
    {
        name: "父节点2 - 折叠",
        children: [{
                name: "父节点21 - 展开",
                open: true,
                children: [
                    { name: "叶子节点211" },
                    { name: "叶子节点212" },
                    { name: "叶子节点213" },
                    { name: "叶子节点214" }
                ]
            },
            {
                name: "父节点22 - 折叠",
                children: [
                    { name: "叶子节点221" },
                    { name: "叶子节点222" },
                    { name: "叶子节点223" },
                    { name: "叶子节点224" }
                ]
            },
            {
                name: "父节点23 - 折叠",
                children: [
                    { name: "叶子节点231" },
                    { name: "叶子节点232" },
                    { name: "叶子节点233" },
                    { name: "叶子节点234" }
                ]
            }
        ]
    },
    { name: "父节点3 - 没有子节点", isParent: true }

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

function beforeClick(treeId, treeNode) {
    if (treeNode.level == 0) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);
        return false;
    }
    return true;
}
// $(document).ready(function() {
//     $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    

// });