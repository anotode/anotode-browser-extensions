// GLOBAL VARS
var hlText
var parentTab

/*
 * Form fill listener
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.method == "highlight_edit"){
    $("#title").val(message.parentTab.title)
    hlText = message.text
    parentTab = message.parentTab
  }
})


$(document).ready(function(){
  /*
   * Send back data on save
   * https://developer.chrome.com/extensions/messaging
   */
  $("#btnSave").click(function (event) {
    var data = {
      method: "save_highlight",
      text: hlText,
      url: parentTab.url,
      parentTab: parentTab
    }
    // title
    var title = $("#title").val().trim()
    if (title) {
      data.title = title
    }
    // comment
    var comment = $("#comment").val().trim()
    if (comment) {
      data.comment = comment
    }
    // category
    var category = $("#category").val().trim()
    if (category) {
      data.category = category
    }
    // tags
    var tags = $("#tags").val().trim()
    if (tags) {
      data.tags = tags.split(' ')
    }
    // send data
    chrome.runtime.sendMessage(data)
    // close the window
    window.close()
    return false;
  })
})
