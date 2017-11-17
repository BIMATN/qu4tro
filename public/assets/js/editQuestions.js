
$(".editQuestion").on( "click", function() {
    var questionId = $(this).data("id");
    var question = $("#question_" + questionId).text();
    var answer = $("#answer_" + questionId).text(); 

    $("#editModalQuestion").val(question.substring(3)); 
    $("#editModalAnswer").val(answer.substring(3)); 
    $("#editModalQuestionId").val(questionId);      
  });

$(".editQuizName").on( "click", function() {
    var quiz_name = $("#quiz_name").text();

    $("#editModalQuizName").val(quiz_name); 
  });
$("#addQuestion").on( "click", function() {
    $("#modalQuestionQuizId").val($(this).data("quizid")); 
  });

