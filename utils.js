function getElementByXpath(path, parent = document){
    return parent.evaluate(path, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
  
function getElementsByXPath(xpath, parent = document){
    let results = [];
    let query = parent.evaluate(xpath, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}


function MakeCheckbox(){
    const label = document.createElement('label');
    label.setAttribute("class", "checkbox_macro")
    const input = document.createElement('input')
    input.setAttribute("type", "checkbox");  
    label.appendChild(input);
    label.appendChild(document.createTextNode("mcr"));     

    return label;
}