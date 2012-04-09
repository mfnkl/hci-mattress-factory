(function(GLOBAL, $, tmpl) {
  
  var piece_list;


  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    task_list = $("#piece_list");
    return GLOBAL.pieces;
  }

  function get() {
    
    $.parse.get("pieces", function(json) {
        var results,
        html;



        results = json.results;
        html = "";
        console.log(results);

        if (results.length === 0) {
            return false;
        }

        results.forEach(function(task) {
            html += tmpl("piece_tmpl", task);
        });
        task_list.html(html);
    });
    
    
  }

  GLOBAL.pieces = {
      init: init,
      get: get
  };

})(window, jQuery, tmpl);

$(function() {
    pieces.init().get();
});



