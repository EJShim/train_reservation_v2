// content.js
//var firstHref = $("a[href^='http']").eq(0).attr("href");


function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
const alternativeButton = buttonElement.cloneNode(true);
alternativeButton.firstChild.removeAttribute('href');
alternativeButton.firstChild.firstChild.setAttribute('src',chrome.extension.getURL('btn_inq_tick_hack.png') )
alternativeButton.firstChild.firstChild.setAttribute('alt', 'Hack');
alternativeButton.style.position='fixed';
parent.appendChild(alternativeButton);



//계속해서 refresh  함.. flag 를 만들어줘야할듯
getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();





alternativeButton.firstChild.addEventListener("click", e=>{
        
    getElementByXpath('//*[@id="center"]/div[3]/p[1]/a').click();
});



// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if( request.message === "clicked_browser_action" ) {
        
        console.log(document.onmousedown);
      }
});