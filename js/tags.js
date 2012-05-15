(function(GLOBAL, $, tmpl) {
  
  var piece_list; 

  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    piece_list = $("#scroller");
    return GLOBAL.pieces;
  }

  function get() {
    var id = objURL[ "i" ];
	
	$.parse.get("tags", {where : { objectId: id }}, function(json) {
        var results, html, pieceList;

        results = json.results;
        html = "";
		    pieceList = json.results[0].pieceIds;

        if (results.length === 0) {
            return false;
        }
		html += '<div class="tag-title"><h3> Tag: '+ json.results[0].tagName+'</h3></div>';
		html += "<ul>";
        pieceList.forEach(function(pieceId) {
			console.log("pieceId", pieceId);
			$.parse.get("pieces", {where : { objectId: pieceId }}, function(json) {
				var results2;
				results2 = json.results;
				if (results2.length === 0) {
					return false;
				}
				html += tmpl("piece_tmpl", results2[0]);
				console.log("html", html);
				piece_list.html(html);
			});
        });

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



