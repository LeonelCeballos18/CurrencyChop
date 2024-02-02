$(document).ready(function() {
  $(".custom-select-trigger").click(function(event) {
    event.stopPropagation(); //prevents propagation of the same event from being called.
    toggleOptions($(this));
  });
  
  // Option selection
  $(".custom-options li").click(function() {
    var selectedOption = $(this).text();
    updateTriggerText($(this).closest(".custom-select"), selectedOption);
  });
  
  // Manage clicks outside of the area
  $(document).on("click", function(event) {
    if (!$(event.target).closest(".custom-select").length) {
      hideOptions($(".custom-select, .custom-select-2"));
    }
  });
  
  function toggleOptions(trigger) {
    let coinOptions = $("#custom-select-coin").next(".custom-options");
    let exchangeOptions = $("#custom-select-exchange").next(".custom-options");

    if (coinOptions.is(":visible") && trigger.attr("id") !== "custom-select-coin") {
        coinOptions.toggle();
    }

    if (exchangeOptions.is(":visible") && trigger.attr("id") !== "custom-select-exchange") {
        exchangeOptions.toggle();
    }

    let options = trigger.next(".custom-options");
    options.toggle();
  }
  
  function updateTriggerText(select, text) {
    var trigger = select.find(".custom-select-trigger");
    trigger.text(text);
    trigger.val(text.val);
    hideOptions(select);
  }
  
  function hideOptions(select) {
    var options = select.find(".custom-options");
    options.hide();
  }
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
      const selectedCoin = $('#custom-select-exchange').val();



    });
  });