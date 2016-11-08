$(document).ready(function(){
  // setup buttons
  $("#signInBtn").click(function(event){
    $("#sign-in-view").removeClass("hidden")
    $("#auth-buttons-view").addClass("hidden")
  })
  $("#registerBtn").click(function(event){
    $("#register-view").removeClass("hidden")
    $("#auth-buttons-view").addClass("hidden")
  })
})
