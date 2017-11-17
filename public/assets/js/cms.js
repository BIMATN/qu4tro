$( document ).ready(function() {

	// set session Storage to "remember" user name and user id
	if(!sessionStorage.user_name){
		sessionStorage.setItem("user_name", $("#user_name").text());
		sessionStorage.setItem("userId", $("#USERID").val());		
	}
	else{
		// $("#menuWelcome").text("Welcome, "+ sessionStorage.userName);
		$("#user_name").text(sessionStorage.user_name);
		// set userid for any hidden form inputs
		$("#USERID").val(sessionStorage.userId);
	};
 

	$("#signOut").on("click", function(){
		sessionStorage.clear();
	});

	$("#btnViewQuiz").on("click", function(){
		$("#frmViewQuiz").submit();
	});

});


