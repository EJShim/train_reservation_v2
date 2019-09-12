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



function checkDOMChange()
{

    const iframes = document.getElementsByTagName("iframe");
    if(iframes.length > 0){
      const iframe = iframes[0]
      const popupButton = getElementByXpath("//a[@class='btn_blue_ang']", iframe.contentWindow.document);

      if(popupButton !== null){
        popupButton.click();        
      }
    }
    setTimeout( checkDOMChange, 100 );
}






//Lets see what I can do
document.title = "automated korail"
var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = chrome.extension.getURL('favicon.ico');
document.getElementsByTagName('head')[0].appendChild(link);



const buttonElement = getElementByXpath('//*[@id="center"]/div[3]/p');
const parent = buttonElement.parentNode;

//Make Button
const alternativeButton = document.createElement('div');
alternativeButton.innerHTML = "좋아하기";
alternativeButton.setAttribute('class', 'btn_ejshim');


parent.appendChild(alternativeButton);

//add icon
const image = document.createElement('img');
image.setAttribute('src', chrome.extension.getURL('favicon.ico'));
alternativeButton.appendChild(image);




function Start(){

  reserveButtons = getElementsByXPath("//td/a/img[@alt='예약하기']")    
  
  if(reserveButtons.length === 0){
    //refresh
    getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();
  }else{
    //Get it hacked!    
    chrome.runtime.sendMessage({"message": "toggle_status_action"});



    checkDOMChange();
    reserveButtons[0].parentNode.click();
    chrome.runtime.sendMessage({"message": "notification_action"});
  }
  
}


alternativeButton.addEventListener("click", e=>{
  
  chrome.runtime.sendMessage({"message": "toggle_status_action"});
  getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();
});



// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if( request.message === "clicked_browser_action" ) {        
      }else if(request.message === "start_action"){
        Start();
      }
});