function skinChange(){

    var change_option,
        reSrc = /\/(skin-.+)\//,
        reHref = /\/(skin-.+)\./,
        option_default = {
            skin:"default",
            bgImg:"",
            file:"skin-default",
            bgFileName:"skin-bg-img-1",
            fontColor:"#000",
            defaultUrl:"../../content/style/white/yingyongdating/css/"
        }

    this.changeStyle = (option) => {
        change_option = Object.assign({},option_default,option||{});
        this.setImgSrc(change_option.file);
        this.setLinkSrc(change_option.file);
        this.backgroundImg(change_option.bgImg || false);
    }
    // 更改页面img src地址
    this.setImgSrc = (file) => {
        let imgs = querySelectorAll("img");
        for(let obj of imgs){
            let src =  obj.getAttribute("src");
            if(reSrc.test(src)){
                let str = src.match(reSrc)[1].split("/")[0];
                src = src.replace(str,file);
                obj.setAttribute("src",src);
            }
        }
    }
    // 更改link，不同文件
    this.setLinkSrc = (file) => {
        let links = querySelectorAll("link");
        for(let obj of links){
            let src =  obj.getAttribute("href");
            if(reHref.test(src)){
                let str = src.match(reHref)[1];
                src = src.replace(str,file);
                obj.setAttribute("href",src);
            }
        }
    }
    // 更改 并 添加背景图片
    this.backgroundImg = (bgImg) => {
        if(!bgImg) {
            let link = querySelector(".skin-add-link");
            if(link) link.remove();
            return false;
        }
        let body = querySelector("body"),
            header = querySelector(".navbar .smart-header"),
            bgBodyDom = createElement("div"),
            bgHeaderDom = createElement("div"),
            head = querySelector("head"),
            addLink = createElement("link");

        addLink.setAttribute("href",change_option.defaultUrl+change_option.bgFileName+".css");
        addLink.setAttribute("rel","stylesheet");
        addLink.classList.add("skin-add-link");
        body.classList.add("skin-add-bg");
        bgHeaderDom.classList.add("skin-header-bg");
        bgBodyDom.classList.add("skin-bg");
        bgBodyDom.style.background = `url(${bgImg}) no-repeat`;
        bgHeaderDom.style.background = `url(${bgImg}) no-repeat`;
        body.appendChild(bgBodyDom);
        header.appendChild(bgHeaderDom);
        head.appendChild(addLink);
    }
    // 默认
    this.refresh = () => {
        this.changeStyle();
    }
    var querySelector = (name) => document.querySelector(name),
        querySelectorAll = (name) => document.querySelectorAll(name),
        createElement = (name) => document.createElement(name);


}
var skinChange = new skinChange();




// ******************************************

skinChange.changeStyle({
    skin:"red",
    bgImg:"../../../../../../www/nodejs/images/img-1.jpg",
    file:"skin-red"
});

// skinChange.refresh();

