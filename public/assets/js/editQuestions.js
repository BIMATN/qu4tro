
$(".editQuestion").on( "click", function() {
    var questionId = $(this).data("id");
    var question = $("#question_" + questionId).text();
    var answer = $("#answer_" + questionId).text(); 


    // $("#editModalQuestion").val($("#question"+questionId).val());
    // $("#editModalAnswer").val($("#answer"+questionId).val());

    $("#editModalQuestion").val(question.substring(3)); 
    $("#editModalAnswer").val(answer.substring(3)); 
    $("#editModalQuestionId").val(questionId);      
  });

