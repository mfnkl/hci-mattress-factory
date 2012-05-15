(function(GLOBAL, $, tmpl) {

  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    return GLOBAL.pieces;
  }

  function get() {
    // for each floor on index, get pieces and add to list
    $('.floor').each(function() {
    	var container = $(this),
    		building = parseInt(container.attr('data-building')),
    		floor = parseInt(container.attr('data-floor')),
    		title = container.attr('data-title');

    	$.parse.get("pieces", {  where : { floorId: floor, building: building } }, function(json) {
        	var results, html;
	       		
	       	results = json.results;
	       	if (results.length > 0) {	
	       		html = '<h3>'+title+'</h3><ul>';
				    results.forEach(function(piece) {
              html += tmpl("piece_tmpl", piece);
				    });
			     	html += "</ul>";
				    container.html(html);
			    }
		  });
    });

    // get announcements
    $.parse.get("announcement", function(json) {
        var results, html;

        results = json.results;
        html = "";

        if (results.length > 0) {
          results.forEach(function(a) {
            html += tmpl("announcement_tmpl", a);
          });
        }

        $('ul.announcements').html(html);
    });
    
    $('html, body').stop().animate({
        scrollTop: $("#floor-1-500").offset().top + 102
    }, 800);
    $('.nav-500 .welcome-floor').parent('li').addClass('active');

  }

  GLOBAL.pieces = {
      init: init,
      get: get
  };

})(window, jQuery, tmpl);

$(function() {
    pieces.init().get();
});



