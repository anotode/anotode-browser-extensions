console.log("Hi")

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if (message.method == "get_selected_text"){
    console.log("get selected message recieved")
    sendResponse({data: window.getSelection().toString()})
  }
})
