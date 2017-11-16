$(function(){
	$("#viewQuizzes").attr("href", "/viewQuizzes/"+sessionStorage.userId);			
	let name = $("#navbarDropdown").data("username");
	let id = $("#navbarDropdown").data("userid");
	if(name){
		sessionStorage.setItem("userName", name);
		sessionStorage.setItem("userId", id);
		$("#view").attr("href", "/viewQuizzes/"+id);
	}
	else{
		$("#navbarDropdown").text("Welcome, "+ sessionStorage.userName);
		$("#view").attr("href", "/viewQuizzes/"+sessionStorage.userId);
		// $(".userID").attr("value", sessionStorage.userID);


	};
	// set userid for any hidden form inputs
	$("#USERID").val(sessionStorage.userId); 

	$("#item1").on("click", function(){
		sessionStorage.clear();
	});
})



