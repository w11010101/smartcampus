"use strict";
 
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
 
(function (window) {
    // 'use strict';
    /**
     * [Proportion description]
     * @param {[type]} el      [description]
     * @param {[type]} options [description]
     */
    function Proportion(el, options) {
        if ((typeof el === "undefined" ? "undefined" : _typeof(el)) !== "object") return false;
        this.el = el || document.querySelector(".proportion-box");
        // 默认样式
        this.el.style.fontSize = 0;
        this.el.style.width = "100%";
        this.el.style.margin = "0";
        this.el.style.backgroundColor = "#fff";
        this.el.style.position = "relative";
        /**
         * [options 默认配置项]
         * @attribute {Object}
         * @attribute {Array}   data                [parame1,parame2, ...]
         * @attribute {Array}   dataTitle           [parame1,parame2, ...]
         * @attribute {Object}  dataStyle           [{css样式书写规略}]
         * @attribute {String}  dataAlign           [edge:靠边;center:"靠中";默认center]
         * @attribute {boolean} dataProportion      [true,默认不显示false]
         * @attribute {Object}  otherSeries         [其他数据]
         * @attribute {Object}  otherSeries.type    [类型：目前只有 list、href]
         * @attribute {Array}  otherSeries.data    [自定义数据]
         * @attribute {Array}  otherSeries.value   [自定义数据名]
         */
 
        this.options = {
            data: [0, 0],
            dataTitle: ['Q', 'A'], // 数据对应标签
            dataStyle: {},
            barStyle: {},
            dataAlign: "center",
            dataProportion: false,
            otherSeries: {
                show: true,
                type: "list"
            }
        };
 
        $.extend(this.options, options);
        // 创建dom
        this.create();
    }
 
    Proportion.prototype = {
        create: function create() {
            var box = this.el;
            var options = {
                Q_val: this.options.data[0],
                A_val: this.options.data[1],
                Q_title: this.options.dataTitle[0],
                A_title: this.options.dataTitle[1],
                align: this.options.dataAlign,
                dataStyle: this.options.dataStyle,
                otherSeries: this.options.otherSeries
            };
 
            var html = [];
 
            html.push(
                "<div class=\"proportion-container\"><div class=\"proportion-part proportion-part-left\"><label>" +
                options.Q_title + "</label>" + this.addVal(options, "left") +
                "<div class=\"proportion-bars-box\">" + this.addProportion(this.options, "left") +
                "<div class=\"proportion-bars\"></div></div></div><div class=\"proportion-part proportion-part-right\"><label>" +
                options.A_title + "</label>" + this.addVal(options, "right") +
                "<div class=\"proportion-bars-box\"><div class=\"proportion-bars\"></div>" +
                this.addProportion(this.options, "right") + "</div></div></div>");
            
            if (this.options.otherSeries) {
                console.log(this.options);
                var data = this.options.otherSeries.data;
                if (this.options.otherSeries.show) {
                    switch (this.options.otherSeries.type) {
                    case "list":
                        var _this = this;
                        html.push(
                            "<div class=\"otherSeries proportion-info-container\"><ul>" + function () {
                            var arr = [];
                            var val = _this.options.otherSeries.value;
                            for (var i in data) {
                                arr.push("<li><span>" + val[i] + "</span><em>" + data[i] + "</em></li>");
                            }
                            return arr.join("");
                        }() + "</ul></div> ");
                        break;
                    case "btns":
                        html.push(
                            "<div class=\"otherSeries proportion-btns\"><button></button><button></button></div> ");
                        break;
                    case "href":
                        html.push(
                            "<div class=\"otherSeries proportion-href\"><a href=\"" +
                            this.options.otherSeries.href[0] + "\">" + this.options.otherSeries.value[0] +
                            "</a><a href=\"" + this.options.otherSeries.href[1] + "\">" +
                            this.options.otherSeries.value[1] + "</a></div> ");
                        break;
                    }
                }
            } else {
                console.log(false);
            }
 
            box.innerHTML = html.join("");
            var h = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
 
            try {
                for (var _iterator = this.el.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;
                    h += parseFloat(event.offsetHeight);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            console.log(this.options)
            this.el.style.height = h + "px";
            this.setDataStyle(options.dataStyle);
            this.barStyle(this.options.barStyle);
            this.setValue(this.options.data[0], this.options.data[1]);
            this.setOtherSeriesStyle(options.otherSeries);
            this.setProportionStyle(this.options.dataProportion);
        },
        addVal: function addVal(option, type) {
            switch (option.align) {
            case "center":
                if (type == "left") {
                    return "<div class=\"bars-value-container\"><span class=\"bars-value\">" + option.Q_val + "</span></div>";
                } else {
                    return "<div class=\"bars-value-container\"><span class=\"bars-value\">" + option.A_val + "</span></div>";
                }
                break;
            case "edge":
                return " ";
                break;
            }
        },
 
        // 设置 bar style
        setValue: function setValue(q, a) {

            console.log(q,a);
            var leftPart = this.queryDom(this.el, ".proportion-part-left"),
                rightPart = this.queryDom(this.el, ".proportion-part-right"),
                leftPartWidth = (q / (q + a) * 100).toFixed(2),
                rightPartWidth = 100 - parseFloat(leftPartWidth),
                leftBar = this.queryDom(leftPart, ".proportion-bars").parentElement,
                rightBar = this.queryDom(rightPart, ".proportion-bars").parentElement;

            var _this = this;
            setTimeout(function () {
                console.log(leftPartWidth);
                leftBar.style.width = leftPartWidth + "%";
                rightBar.style.width = rightPartWidth + "%";
                // 如果不存在dataAlign
                if (_this.options.dataAlign == "center") {
                    _this.trim(leftBar, rightBar);
                }
            }, 100);
        },
        // 进度条样式
        barStyle: function barStyle(style) {
 
            var bar = document.querySelectorAll(".proportion-bars-box");
            for (var j = 0; j < bar.length; j++) {
                for (var i in style) {
                    bar[j].style[i] = "calc(.3rem + " + (style[i] + "px") + ")";
                }
            }
        },
        // 设置 leftLabel 的css
        setDataStyle: function setDataStyle(style) {
            var label = document.querySelectorAll(".proportion-part label");
            for (var j = 0; j < label.length; j++) {
                for (var i in style) {
                    label[j].style[i] = style[i];
                }
            }
        },
        // 设置 OtherSeries的css
        setOtherSeriesStyle: function setOtherSeriesStyle(option) {
            if (option.show) {
                var otherSeries = document.querySelector(".otherSeries");
                // otherSeries.style.
                // console.log(otherSeries)
            }
        },
        // 显示刻度对比数
        addProportion: function addProportion(option, type) {
            var proportion = option.dataProportion;
            var sum = option.data[0] + option.data[1];
            var PropNum = ((type == "left" ? option.data[0] / sum : option.data[1] / sum) * 100).toFixed(2);
            if (proportion) {
                return "<div class=\"proportion-num\">" + PropNum + "%</div>";
            } else {
                return " ";
            }
        },
        // 设置对比数的css
        setProportionStyle: function setProportionStyle(proportion) {
            if (proportion) {
                document.querySelector(".proportion-container").classList.add('proportion-num-show');
            }
            return "";
            return proportion ? "width:calc(99% - .5rem)" : "";
        },
        createDom: function createDom(tag) {
            return document.createElement(tag);
        },
        queryDom: function queryDom(parent, name) {
            var doc = _typeof(arguments[0]) === "object" ? arguments[0] : document;
            var docName = typeof arguments[0] === "string" ? arguments[0] : name;
            return doc.querySelector(docName);
        },
        // 微调css
        trim: function trim(left, right) {
            var W = document.querySelector(".proportion-part").offsetWidth;
            var LP = parseFloat(left.style.width.substr(0, left.style.width.length - 1));
            // left     ------------------
            var leftVal = this.queryDom(left.parentElement, ".bars-value-container");
            var leftValW = this.queryDom(leftVal, ".bars-value").offsetWidth;
            var leftLabel = this.queryDom(left.parentElement, "label");
            var leftBar = this.queryDom(left.parentElement, ".proportion-bars");
            var LBW = W * LP / 100;
            // right    ------------------
            var rightVal = this.queryDom(right.parentElement, ".bars-value-container");
            var rightValW = this.queryDom(rightVal, ".bars-value").offsetWidth;
            var rightLabel = this.queryDom(right.parentElement, "label");
            var rightBar = this.queryDom(right.parentElement, ".proportion-bars");
            var RBW = W - LBW;
            // left
            if (LBW / 2 - 10 > leftLabel.offsetWidth) {
                leftVal.style.left = LBW / 2 - leftValW / 2 + "px";
            } else {
                leftVal.style.left = parseFloat(leftLabel.offsetWidth) + 10 + "px";
            }
            // right
            if (RBW / 2 - 10 > rightLabel.offsetWidth) {
                rightVal.style.right = RBW / 2 - rightValW / 2 + "px";
            } else {
                console.log("小");
                rightVal.style.right = parseFloat(rightLabel.offsetWidth) + 10 + "px";
            }
        }
    };
 
    if (typeof module != 'undefined' && module.exports) {
        module.exports = Proportion;
    } else if (typeof define == 'function' && define.amd) {
        define(function () {
            return Proportion;
        });
    } else {
        window.Proportion = Proportion;
    }
})(this);