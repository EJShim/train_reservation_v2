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
    }else if( request.message === "notification_action"){
      
      chrome.notifications.create(
        'name-for-notification',{   
        type: 'basic', 
        iconUrl: 'main-icon.png', 
        title: "표끊음", 
        message: "표끊었다 결제해라!" 
        },e=>{
          console.log("notification");
        });
    }
});


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {  
  if(changeInfo.status === "complete" && status === true){
    chrome.tabs.sendMessage(tabId, {"message": "start_action"});
  }  
});