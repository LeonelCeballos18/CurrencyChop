$(document).ready(function() {
  $(".custom-select-trigger").click(function(event) {
    event.stopPropagation(); //prevents propagation of the same event from being called.
    toggleOptions($(this));
  });

  
  let coinValue;
  let exchangeValue;
  if ($("#amount").val() != false) {
    updateConverter(coinValue, exchangeValue);
 }
  // Option selection
  $(".custom-options li").click(function() {
    let selectedOptionText = $(this).text();
    let selectedCoin = $(this).data("coin-id");
    let selectedExchange = $(this).data("exchange-id");
    updateConverter(selectedCoin, selectedExchange)
    updateTriggerText($(this).closest(".custom-select"), selectedOptionText);
  });
  
  // Manage clicks outside of the area
  $(document).on("click", function(event) {
    if (!$(event.target).closest(".custom-select").length) {
      hideOptions($(".custom-select, .custom-select-2"));
    }
  });
  
  function toggleOptions(trigger) { //The options are hidden if the user opens other options
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

  function updateTriggerText(select, text) { //The trigger text is update
    let trigger = select.find(".custom-select-trigger");
    trigger.text(text);
    hideOptions(select);
  }
  
  function hideOptions(select) { //Function to hide all the options
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
      if ($("#amount").val() != false) {
        updateConverter(coinValue, exchangeValue);
        $(".exchange-result").show();
     }else{
      $(".exchange-result").hide();
     }
    });

    function updateConverter(coin, exchange){
      if(coin === undefined){
        coin = $("#li-coin").data("coin-id");
        exchangeValue = exchange;
      }else if(exchange === undefined){
        exchange = $("#li-exchange").data("exchange-id");
        coinValue = coin;
      }
      if(coinValue === undefined){
        coinValue = $("#li-coin").data("coin-id");
      }else if(exchangeValue === undefined){
        exchangeValue = $("#li-exchange").data("exchange-id");
      }
      console.log(coinValue);
      console.log(exchangeValue); //Global is the answer
      const ApiUrl = "https://api.coingecko.com/api/v3"
      const apiKey = "x_cg_demo_api_key=CG-F1TnaAfdS3FyGboUQ4kEsnTt";
      $.get(ApiUrl + `/coins/markets?vs_currency=${exchangeValue}&ids=${coinValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&` + apiKey, function(data){
        $("#dashboard-info").text(`${$("#amount").val()} ${data[0].name} = ${data[0].current_price * $("#amount").val()} ${exchangeValue}`);
        $("#img-coin").attr('src', `${data[0].image}`);
        $("#last-update").text(`Last update: ${data[0].last_updated}`);
      });
    }
  });