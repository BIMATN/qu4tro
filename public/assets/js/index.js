$( document ).ready(function() {
	// if a user logged in, no need to show login option
	if(sessionStorage.user_name){
		$(".login").hide();
	}
	else{
		$(".login").show();
	};
	
 	$("#signOut").on("click", function(){
		sessionStorage.clear();
	});

});