
// depending on which question to edit, transfer question, answer and id to modal
$(".editQuestion").on( "click", function() {
    var questionId = $(this).data("id");
    var question = $("#question_" + questionId).text();
    var answer = $("#answer_" + questionId).text(); 

    $("#editModalQuestion").val(question.substring(3)); 
    $("#editModalAnswer").val(answer.substring(3)); 
    $("#editModalQuestionId").val(questionId);      
  });

// depending on which quiz to edit, transfer quiz name to modal
$(".editQuizName").on( "click", function() {
    var quiz_name = $("#quiz_name").text();

    $("#editModalQuizName").val(quiz_name); 
  });

//add transfer quiz id to modal to add question to quiz
$("#addQuestion").on( "click", function() {
    $("#modalQuestionQuizId").val($(this).data("quizid")); 
  });

