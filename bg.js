
chrome.commands.onCommand.addListener(function(command) {
  if (command == "highlight-selected-text"){
    getCurrentTab(function(tab){
      chrome.tabs.sendMessage(tab.id, {method: "get_selected_text"}, function(resp){
        console.log(resp.data)
      })
    })
  }
  console.log('Command:', command)
})


// http://stackoverflow.com/questions/7303452/how-to-get-current-tabid-from-background-page
function getCurrentTab(tabCallback) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) {
      tabCallback(tabArray[0])
    }
  )
}
