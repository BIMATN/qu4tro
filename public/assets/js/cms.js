$(function(){
	sessionStorage.setItem("userName", $("#navbarDropdown").data("username").val().trim());
	sessionStorage.setItem("userId", $("#navbarDropdown").data("userid").val().trim());
})