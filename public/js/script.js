$(document).ready(function() {
    $(".custom-select-trigger").click(function() {
      $(".custom-options").toggle();
    });

    $(".custom-options li").click(function() {
      var selectedOption = $(this).text();
      $(".custom-select-trigger").text(selectedOption);
      $(".custom-options").hide();
    });

    $(document).on("click", function(event) {
      if (!$(event.target).closest(".custom-select").length) {
        $(".custom-options").hide();
      }
    });

    /*The input text is validated to receive only numbers and also so that the user can not copy, cut and paste
    something into the input
    */
    $(".coin").keypress(function(e) {
      if (isNaN(this.value + String.fromCharCode(e.charCode))) {
          return false;
      }
    })
    .on("cut copy paste", function(e) {
      e.preventDefault();
    })
    .on("input", function() {
      console.log(2);
    });

    function updateConvertion(){
      
    }
  });