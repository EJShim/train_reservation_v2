function getElementByXpath(path, parent = document) {
  return parent.evaluate(path, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getElementsByXPath(xpath, parent = document)
{
    let results = [];
    let query = parent.evaluate(xpath, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  if( request.message === "clicked_browser_action" ) {    
    sessionStorage.setItem('activate', 'false');    
  }
});

function handleiFrmae()
{
    const iframes = document.getElementsByTagName("iframe");
    if(iframes.length > 0){
      const iframe = iframes[0]
      const popupButton = getElementByXpath("//a[@class='btn_blue_ang']", iframe.contentWindow.document);

      if(popupButton !== null){
        popupButton.click();        
      }
    }


    setTimeout( handleiFrmae, 100 );
}

function MakeCheckbox(){
  const label = document.createElement('label');
  label.setAttribute("class", "checkbox_macro")
  const input = document.createElement('input')
  input.setAttribute("type", "checkbox");  
  label.appendChild(input);
  label.appendChild(document.createTextNode("매크로")); 
  // label.appendChild(document.createTextNode("매크로"));

  return label;
}


function Start(e){  


  //test  
  const activeCheckboxes = []
  checkboxes.forEach((label, idx)=>{
    // console.log(label.firstChild.checked, idx)

    if(label.firstChild.checked){
      activeCheckboxes.push(idx);
    }
  });

  
  if(activeCheckboxes.length < 1){
    alert("원하는 시간을 체크하고 돌리세요");
    return;
  }

  sessionStorage.setItem('checkstate', JSON.stringify(activeCheckboxes));


  //Set Active State
  sessionStorage.setItem('activate', true);
  getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();
}


function Stop(){
  sessionStorage.setItem('activate', false);
  sessionStorage.setItem('checkstate', JSON.stringify([]));
}



function Active(){

  const available = getElementsByXPath("//label[@class='checkbox_macro']/input[@checked]/../../a/img[@alt='예약하기']");
  
  
  if(available.length === 0){
    //refresh
    getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();
  }else{
    

    handleiFrmae();    
    available[0].parentNode.click();
    chrome.runtime.sendMessage({"message": "notification_action"});
    //Get it hacked!
    // sessionStorage.setItem("activate", "false");
    Stop()
  }  
}



const checkboxes = [];


///Main Code
(() => {

  if(sessionStorage.activate === undefined){
    sessionStorage.setItem('activate', false);
  }

  if(sessionStorage.checkstate == undefined){
    sessionStorage.setItem('checkstate', JSON.stringify([]));
  }

  const resultTable = getElementsByXPath("//tbody/tr[@class='']");
  resultTable.forEach(rowElement=>{

    const targetElementSpecial = rowElement.querySelector('td:nth-child(5)');
    const targetElementNormal = rowElement.querySelector('td:nth-child(6)');
    
    //add checkbox
    if(targetElementSpecial.childNodes.length !== 1){

      const checkbox = MakeCheckbox();      
      targetElementSpecial.appendChild(checkbox);
      checkboxes.push(checkbox);
    }

    if(targetElementNormal.childNodes.length !== 1){
      const checkbox = MakeCheckbox();
      targetElementNormal.appendChild(checkbox);
      checkboxes.push(checkbox);
    }
  });

  // //test checkbox
  // checkboxes.forEach(checkbox=>{
  //   checkbox.firstChild.setAttribute("checked", true);
  // })

  const activeCheckboxIdx = JSON.parse(sessionStorage.checkstate);
  activeCheckboxIdx.forEach(index=>{    
    checkboxes[index].firstChild.setAttribute("checked", true);
  })

  
  //Change Title
  document.title = "automated korail"
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = chrome.extension.getURL('favicon.ico');
  document.getElementsByTagName('head')[0].appendChild(link);


  //Make Button    
  const alternativeButton = document.createElement('div');
  alternativeButton.innerHTML = "좋아하기";
  alternativeButton.setAttribute('class', 'btn_ejshim');
  getElementByXpath('//*[@id="center"]/div[3]').appendChild(alternativeButton);
  const image = document.createElement('img');
  image.setAttribute('src', chrome.extension.getURL('favicon.ico'));
  alternativeButton.appendChild(image);
  alternativeButton.addEventListener("click", e=>{Start(e)});
  


  //if activate flag on, start
  if(JSON.parse(sessionStorage.activate)){    
    Active();
  }
})();

// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  if( request.message === "clicked_browser_action" ) {        
  }else if(request.message === "start_action"){
   
  }else if(request.message === "onUpdated_action"){
    
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
  }
});