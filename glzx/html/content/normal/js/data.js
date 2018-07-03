// data
var data = [
    {
        level: 0,
        text: '示例管理',
        id: 1,
        icon: "gear-a",
        nodes: [
            {
                level: 1,
                text: "示例-2层",
                id: 11,
                icon: "cube",
                nodes: [
                    {
                        level: 1,
                        text: "container-1.html",
                        id: 112,
                        href: "views/container/container-1.html",
                        nid: "container-1",
                        nodes: null,
                    },
                    {
                        level: 1,
                        text: "container-2.html",
                        id: 113,
                        href: "views/container/container-2.html",
                        nid: "container-2",
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "modules.html",
                        id: 116,
                        href: "views/container/modules.html",
                        nid: "modules",
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "子集4",
                        id: 114,
                        nodes: [{
                                level: 2,
                                text: "子集4-1",
                                id: 1141,
                                href: "container-4-1",
                                nodes: [{
                                        level: 2,
                                        text: "子集5-1",
                                        id: 11411,
                                        href: "container-4-1",
                                        nodes: null
                                    },
                                    {
                                        level: 2,
                                        text: "子集5-2",
                                        id: 11421,
                                        href: "container-4-2",
                                        nodes: null
                                    },
                                ]

                            },
                            {
                                level: 2,
                                text: "子集4-2",
                                id: 1142,
                                href: "container-4-2",
                                nodes: null
                            },
                        ]
                    },
                ]
            },
            {
                level: 1,
                text: "示例-sub2",
                id: 12,
                icon: "cube",
                nodes: [
                    {
                        level: 1,
                        text: "示例-sub2-sub1",
                        id: 121,
                        href: "sub2-sub-1",
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "示例-sub2-sub2",
                        id: 122,
                        // href: "sub2-sub-2",
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "示例-sub2-sub3",
                        id: 123,
                        nodes: null
                    },

                ]
            },
            {
                level: 1,
                text: "示例-sub3",
                id: 13,
                icon: "cube",
                nodes: [
                    {
                        level: 1,
                        text: "示例-sub3-sub",
                        id: 131,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "示例-sub3-sub",
                        id: 132,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "示例-sub3-sub",
                        id: 133,
                        nodes: null
                    },

                ]
            },
        ]
    },
    {
        level: 0,
        text: '运维管理',
        id: 2,
        icon: "gear-b",
        nodes: [
            {
                level: 1,
                text: "运维管理-sub1",
                id: 21,
                nodes: [{
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 211,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 212,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 213,
                        nodes: null
                    },

                ]
            },
            {
                level: 1,
                text: "运维管理-sub2",
                id: 22,
                nodes: [{
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 221,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 222,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub2-sub",
                        id: 223,
                        nodes: null
                    },

                ]
            },
            {
                level: 1,
                text: "运维管理-sub3",
                id: 23,
                nodes: [{
                        level: 1,
                        text: "运维管理-sub3-sub",
                        id: 231,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub3-sub",
                        id: 232,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub3-sub",
                        id: 233,
                        nodes: null
                    },

                ]
            },
            {
                level: 1,
                text: "运维管理-sub4",
                id: 24,
                nodes: [{
                        level: 1,
                        text: "运维管理-sub4-sub",
                        id: 241,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub4-sub",
                        id: 242,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "运维管理-sub4-sub",
                        id: 243,
                        nodes: null
                    },

                ]
            },
        ]
    },
    {
        level: 0,
        text: '智慧食堂',
        id: 3,
        icon: "star",
        nodes: [
            {
                level: 1,
                text: "智慧食堂-sub1",
                id: 31,
                nodes: [{
                        level: 1,
                        text: "智慧食堂-sub1-sub",
                        id: 311,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "智慧食堂-sub2-sub",
                        id: 312,
                        nodes: null
                    },
                    {
                        level: 1,
                        text: "智慧食堂-sub3-sub",
                        id: 313,
                        nodes: null
                    },

                ]
            },
            {
                level: 1,
                text: "智慧食堂-sub2",
                id: 32,
                nodes: null
            },
        ]
    },
    {
        level: 0,
        text: 'APP管理',
        id: 4,
        icon:"cube",
        nodes: [
            {
                level: 1,
                text: "APP管理-sub1",
                id: 41,

                nodes: null
            },
            {
                level: 1,
                text: "APP管理-sub2",
                id: 42,
                nodes: null
            },
        ]
    },
]