$(document).ready(function(){
  // init
  getKey("token", function(value){
    if (value != null){
      showCurrentUserView()
    }
  })
  // setup error boxes
  $("#danger-box").hide().find('.close').click(function(event){
    $("#danger-box").hide()
  })

  // setup button clicks
  $("#signInBtn").click(function(event){
    $("#sign-in-view").removeClass("hidden")
    $("#auth-buttons-view").addClass("hidden")
  })
  $("#registerBtn").click(function(event){
    $("#register-view").removeClass("hidden")
    $("#auth-buttons-view").addClass("hidden")
  })
  $("#signOutBtn").click(function (e) {
    clearAllData()
    showWelcomeView()
  })
  $("#forgot_pwd_link").click(function (e) {
    $("#sign-in-view").addClass("hidden")
    $("#forgot-view").removeClass("hidden")
  })

  // setup form submits
  $("#doLoginBtn").click(function(e){
    var data = JSON.stringify({
      "email": $("#sign_in_email").val(),
      "password": $("#sign_in_password").val()
    })
    // request
    $.ajax({
      type: "POST",
      url: 'http://anotode.herokuapp.com/api/login',
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function(data, textStatus, jqXHR){
        console.log(data)
        console.log(data["token"])
        setKey("token", data["token"])
        showCurrentUserView()
      },
      error: function(jqXHR, textStatus, errorThrown){
        $("#danger-box").show()
          .find('.message').html($.parseJSON(jqXHR.responseText).error)
      },
      dataType: 'json'
    })
    // end
    return false;
  })
  // ...............
  // register button
  // ...............
  $("#doRegisterBtn").click(function(e) {
    var data = JSON.stringify({
      "email": $("#register_email").val(),
      "password": $("#register_password").val(),
      "username": $("#register_username").val()
    })
    // request
    $.ajax({
      type: "POST",
      url: 'http://anotode.herokuapp.com/api/users',
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function (data, textStatus, jqXHR) {
        console.log(data)
        showWelcomeView()
        $("#signInBtn").trigger('click')
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#danger-box").show()
          .find('.message').html($.parseJSON(jqXHR.responseText).error)
      },
      dataType: 'json'
    })
    // end
    return false;
  })
  //.................
  // forgot pwd button
  //.................
  $("#forgotBtn").click(function(e) {
    var data = JSON.stringify({
      "email": $("#forgot_email").val()
    })
    // request
    $.ajax({
      type: "POST",
      url: 'http://anotode.herokuapp.com/api/login/forgot_password',
      contentType: 'application/json; charset=utf-8',
      data: data,
      success: function (data, textStatus, jqXHR) {
        showWelcomeView()
        $("#danger-box").show()
          .find('.message').html("Reset Email sent")
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#danger-box").show()
          .find('.message').html($.parseJSON(jqXHR.responseText).error)
      },
      dataType: 'json'
    })
    // end
    return false;
  })
  // end document ready
})

function showWelcomeView(){
  $("#intro_text").removeClass("hidden")
  $("#auth-buttons-view").removeClass("hidden")
  $("#current_status").addClass("hidden")
  $('.user-form').addClass("hidden")
}

function showCurrentUserView(){
  $("#intro_text").addClass("hidden")
  $(".user-form").addClass("hidden")
  $("#current_status").removeClass("hidden")
}
