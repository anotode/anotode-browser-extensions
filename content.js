console.log("Hi")

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if (message.method == "get_selected_text"){
    console.log("get selected message recieved")
    var selText = window.getSelection().toString()
    colourText(selText)
    sendResponse({data: selText})
  }
})

// 3rd
// http://stackoverflow.com/questions/926580/find-text-string-using-jquery
function colourText2(text){
  console.log(text)
  $('*:contains("' + text + '"):last').each(function(){  // find nearest occurence
    //if($(this).children().length < 1)
      var hay = text.replace(/\s/g, '(<.*?>)*')
      console.log(hay)
      $(this).html(
        $(this).html().replace(
          text
          ,"<span class='anotode-highlighted-text'>" + text + "</span>"
        )
      )
  })
}

// problem - chrome tinkering with wrong nested tags
// soln - manual breaking highlight tag
function colourText(text){
  var hay = text.replace(/\s/g, '(<[^\>]*?>|\\s)*')
  console.log(hay)
  var reg = new RegExp("(" + hay + ")")
  console.log(reg)
  $(document.body).html(
    $(document.body).html().replace(
       reg
      ,"<span class='anotode-highlighted-text'>" + "$1" + "</span>"
    )
  )
}
