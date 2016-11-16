
// TODO: Dont work if not login
chrome.commands.onCommand.addListener(function(command) {
  /*
   * Highlight text and save it on server
   */
  if (command == "highlight-selected-text"){
    getCurrentTab(function(tab){
      // send message to tab to get text
      chrome.tabs.sendMessage(tab.id, {method: "get_selected_text"}, function(resp){
        // prepare to save
        console.log(resp.data)
        showHighlightPopup(tab, resp.data)
      })
    })
  }
})

/*
 * Message Listeners
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  /*
   * Save Highlight after editing
   */
  if (message.method == "save_highlight"){
    console.log(message)
    var parentTab = message.parentTab
    // delete extra keys
    delete message.method
    delete message.parentTab
    // save and highlight
    annotateText(message, parentTab)
    chrome.tabs.sendMessage(
      parentTab.id,
      {method: "highlight_text", text: message.text}
    )
  }
})

/*
 * Show popup menu to edit highlight and add attributes
 */
function showHighlightPopup(parentTab, text){
  // Make window configuration
  var cfg = {
    url: 'components/highlight_edit.html',
    type: 'popup',
    focused: true,
    width: 400,
    height: 400
  }
  // Create window
  chrome.windows.create(cfg, function (window) {
    var tab = window.tabs[0]
    // fill form call
    var fillTab = function () {
      var data = {
        method: "highlight_edit",
        parentTab: parentTab,
        text: text
      }
      chrome.tabs.sendMessage(tab.id, data)
    }
    // send fill form call
    if (tab.status == "complete"){
      fillTab()
    } else {
      // TODO: ugly hack
      setTimeout(fillTab, 600)
    }
  })
}

/*
 * Given the text and other things, save it to server
 */
function annotateText(hlData, tab){
  var data = JSON.stringify(hlData)
  console.log(data)
  // request function
  var request = function(token){
    $.ajax({
      type: "POST",
      url: 'http://anotode.herokuapp.com/api/highlights?token=' + token,
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function(data, textStatus, jqXHR){
        console.log(data)
        consoleLogContent("Highlighted text saved")
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(textStatus + " " + errorThrown)
      },
      dataType: 'json'
    })
  }
  // get token and do request
  getKey("token", function(token){
    request(token)
  })
}

/*
 * CONTEXT MENUS
 */
chrome.contextMenus.create({
  id: "anotode-annotate",
  title: "Anotode: Annotate",
  contexts: ["selection"]
})

chrome.contextMenus.onClicked.addListener(function(info, tab){
  if (info.menuItemId == "anotode-annotate"){
    console.log(info.selectionText)
    showHighlightPopup(tab, info.selectionText)
  }
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


// console log content script
function consoleLogContent(msg){
  getCurrentTab(function(tab){
    chrome.tabs.sendMessage(tab.id, {method: "console_log", data: "MSG: " + msg})
  })
}
