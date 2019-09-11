// background.js
let status = false;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab)=> {    
    status = false;
});


//runtime message
// This block is new!
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if( request.message === "refresh" ) {      
      console.log(status);
    }else if (request.message === "toggle_status_action"){
      status = !status;      
    }
});


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {  
  if(changeInfo.status === "complete" && status === true){
    chrome.tabs.sendMessage(tabId, {"message": "start_action"});
  }  
});