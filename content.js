// content.js
//var firstHref = $("a[href^='http']").eq(0).attr("href");

//Lets see what I can do
document.title = "automated korail"
var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = chrome.extension.getURL('favicon.ico');
document.getElementsByTagName('head')[0].appendChild(link);

document.onmousedown = e=>{
    e.preventDefault();
    console.log("asdfasdf");
}
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if( request.message === "clicked_browser_action" ) {
        
        console.log(document.onmousedown);
      }
});