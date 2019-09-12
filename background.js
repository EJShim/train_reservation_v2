const audio = document.createElement('audio');
document.body.appendChild(audio);
// audio.autoplay = true;
audio.src = chrome.extension.getURL('dundun.mp3');
let playCount = 0;
let alarm = false;


function playAlarm() {

  playCount++;

  audio.play();

  if(playCount > 60){
    playCount = 0;
    return;
  }

  if(!alarm) return;

  setTimeout(playAlarm, 1000);
}

//runtime message
// This block is new!
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if( request.message === "notification_action"){      
    chrome.notifications.create(
      'name-for-notification',{   
      type: 'basic', 
      iconUrl: 'main-icon.png', 
      title: "표끊음", 
      message: "표끊었다 결제해라!" 
      },e=>{
        console.log("notification");
      });
      alarm = true;
      playAlarm();
  }
});


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab)=> {    
  // chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
  alarm = false;

});