
// depending on which quiz was clicked, setup modal with corresponding quiz id
$("#addQuestion").on( "click", function() {
    $("#modalQuestionQuizId").val($(this).data("quizid")); 
  });