$( document ).ready(function() {
	// if a user logged in, show more menu items
	if(sessionStorage.user_name){
		$(".authenticated").show();
		$(".loggedOutOnly").hide();
		console.log("set");
	}
	else{
		$(".authenticated").hide();
		$(".loggedOutOnly").show();	
		console.log("not set");	
	};
	
 	$("#signOut").on("click", function(){
		sessionStorage.clear();

	});

});