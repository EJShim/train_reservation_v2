// content.js
var firstHref = $("a[href^='http']").eq(0).attr("href");


// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
      if( request.message === "clicked_browser_action" ) {
        var firstHref = $("a[href^='http']").eq(0).attr("href");
  
        console.log(firstHref);
      }
});