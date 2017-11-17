$( document ).ready(function() {
	// if a user logged in, show more menu items
	if(sessionStorage.user_name){
		$(".authenticated").show();
		$(".loggedOutOnly").hide();
	}
	else{
		$(".authenticated").hide();
		$(".loggedOutOnly").show();		
	};
	
 	$("#signOut").on("click", function(){
		sessionStorage.clear();

	});

});