import _ form "lodash"
function component(){
    var element = document.createElement("div");
    element.innerHTML = _.join(["hello","webpack"]);
    return element;
}
document.body.appendChild(component());