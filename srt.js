const g_checkboxes = [];

///Main Code
(() => {
    //조회하기 버튼
    const refreshButton = getElementByXpath('//*[@id="search_top_tag"]/input');

    const alternativeButton = document.createElement('div');
    let classAttribute = refreshButton.getAttribute('class');
    classAttribute += " ej_btn";
    alternativeButton.setAttribute('class', classAttribute);
    alternativeButton.style['background-image'] = `url(${chrome.extension.getURL('favicon.ico')})`    
    alternativeButton.appendChild(document.createTextNode('좋아하기'));
    refreshButton.parentNode.appendChild(alternativeButton);    

    //체크박스
    const rows = getElementsByXPath('//tbody/tr')

    rows.forEach(rowElement=>{        

        const targetElementSpecial = rowElement.querySelector('td:nth-child(6)');
        const targetElementNormal = rowElement.querySelector('td:nth-child(7)');

        if(targetElementSpecial.childNodes.length > 1){
            const checkBox = MakeCheckbox();
            targetElementSpecial.appendChild(document.createElement('br'));
            targetElementSpecial.appendChild(checkBox);
        }

        if(targetElementNormal.childNodes.length > 1){
            const checkBox = MakeCheckbox();
            targetElementNormal.appendChild(document.createElement('br'));
            targetElementNormal.appendChild(checkBox);
        }
    });


})();