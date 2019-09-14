const g_checkboxes = [];


function onClickLike(e){    

    //test  
    const activeCheckboxes = []
    g_checkboxes.forEach((label, idx)=>{    
        if(label.firstChild.checked){
        activeCheckboxes.push(idx);
        }
    });

    if(activeCheckboxes.length < 1){
        alert("원하는 시간을 체크하고 돌리세요");
        return;
    }

    sessionStorage.setItem('checkstate', JSON.stringify(activeCheckboxes));
    sessionStorage.setItem('activate', true);   


    const refreshButton = getElementByXpath('//*[@id="search_top_tag"]/input');
    refreshButton.click();
}

function Active(){
    const refreshButton = getElementByXpath('//*[@id="search_top_tag"]/input');
    refreshButton.click();

}

function Stop(){
    sessionStorage.setItem('activate', false);
    sessionStorage.setItem('checkstate', JSON.stringify([]));
}


//disable when esc key pressed
document.addEventListener('keydown', e=>{    
    switch(e.keyCode){
      case 27:
        e.preventDefault();
        Stop();
        alert("매크로 멈춤");
      break;
      default:
      break;
    }
});


///Main Code
(() => {
    //Session  초기화
    if(sessionStorage.activate === undefined){
        sessionStorage.setItem('activate', false);
    }

    if(sessionStorage.checkstate == undefined){
        sessionStorage.setItem('checkstate', JSON.stringify([]));
    }



    //조회하기 버튼
    const refreshButton = getElementByXpath('//*[@id="search_top_tag"]/input');

    const alternativeButton = document.createElement('div');
    let classAttribute = refreshButton.getAttribute('class');
    classAttribute += " ej_btn";
    alternativeButton.setAttribute('class', classAttribute);
    alternativeButton.style['background-image'] = `url(${chrome.extension.getURL('favicon.ico')})`    
    alternativeButton.appendChild(document.createTextNode('좋아하기'));
    alternativeButton.addEventListener('click', e=>{onClickLike(e)});
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

            g_checkboxes.push(checkBox);
        }

        if(targetElementNormal.childNodes.length > 1){
            const checkBox = MakeCheckbox();
            targetElementNormal.appendChild(document.createElement('br'));
            targetElementNormal.appendChild(checkBox);
            g_checkboxes.push(checkBox);
        }
    });

    //Update Checkbox
    const activeCheckboxIdx = JSON.parse(sessionStorage.checkstate);
    activeCheckboxIdx.forEach(index=>{    
        g_checkboxes[index].firstChild.setAttribute("checked", true);
    })



    //active?
    //if activate flag on, start
    if(JSON.parse(sessionStorage.activate)){    
        Active();
    }

})();