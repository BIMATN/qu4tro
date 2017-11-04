$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;


  // Getting jQuery references to the post body, title, form, and category select
  var userNameInput = $("#userName");
  var passwordInput = $("#password");
  var loginForm = $("#login");


  // Adding an event listener for when the form is submitted
  // loginForm.on("submit", function handleFormSubmit(event) {
  //   event.preventDefault();
  //   // Wont submit the request if we are missing a username or a password
  //   if (!userNameInput.val().trim() || !passwordInput.val().trim()) {
  //     return;
  //   }

  //   // Constructing a newUser object to hand to the database
  //   var newUser = {
  //     userName: userNameInput.val().trim(),
  //     password: passwordInput.val().trim()
  //   };

  //   console.log("new user:" + newUser);

  //   // send newUser to authenticate
  //   authenticate(newUser);
  // });

  // Gets post data for a post if we're editing
  function authenticate(User) {

    $.ajax({
      method: "GET",
      url: "/authenticate",
      data: User
    })
    .done(function(err, data) {
        if (data){

          window.location.href = "/cms";          
        }
        else{
          console.log(err);
        }
    });

    // $.get("/authenticate/", User, function(data) {
    //   if (data) {
    //     // If this user exists, send to cms.html
    //    window.location.href = "/cms";
    //   }
    // });
  }

});
