/**
 * Copyright reelyActive 2014
 * We believe in an open Internet of Things
 */


var DEFAULT_JSON = { person: { portraitImageUrl: "http://reelyactive.com/images/barnowl.jpg" } };


$(document).ready( function(){
  $("input").on("keyup", onInput);
  $.get("/places", function(data) {
    $(data).each(function() {
      var option = $('<option>'+this.displayName+'</option>');
      option.attr('value', this.identifier);
      $('#places').append(option);
    });
  }, 'json');
  $('#places').change(function() {
    window.location.href = 'http://' + window.location.host + '/' + $(this).val();
  });
  $.get("/silourl", function(data) {
    $('form#checkin').prop("action", data.url + '/add');
  }, 'json');
});


$("#json").append(JSON.stringify(DEFAULT_JSON, undefined, 2));


var onInput = function() {
  var personInputs = {};
  $.each($("form").serializeArray(), function() {
    if ((this.value !== "") && (this.name != "place") && (this.name != "duration")) {
      personInputs[this.name] = this.value;
    }
  });

  var userJson = { person: personInputs };
  $("#json").html(JSON.stringify(userJson, undefined, 2));
};
