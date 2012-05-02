(function(GLOBAL, $, tmpl) {
  
  var piece_list, piece_detail; 

  $.parse.init({
      app_id: "LKndLqOkr8fE4AH7BcfpmJbXNJMW6ElrMPHGI7iY", // <-- enter your Application Id here
      rest_key: "wIpqcITCvjSirwsYUkGco27hXMoNPmiBHzuulflw" // <--enter your REST API Key here	
  });

  function init() {
    piece_list = $("#scroller");
    piece_detail = $("#piece_detail");
    return GLOBAL.pieces;
  }

  function get() {
    
    $.parse.get("pieces", {  order : "-floorId,title" }, function(json) {
        var results;
		var html500 = "";
		var html1414 = "";
		var html516 = "";
		var html = "";
		var floorCounter500 = 4;
		var floorCounter1414 = 3;
		var floorCounter516 = 3;

        results = json.results;
        console.log(results);

        if (results.length === 0) {
            return false;
        }

		html500 += '<div id="building-500" class="building active">';
        html500 += '<section class="floor" id="floor-4-500"><ul>';
		html1414 += '<div id="building-1414" class="building">';
        html1414 += '<section class="floor" id="floor-3-1414"><ul>';
		html516 += '<div id="building-516" class="building">';
        html516 += '<section class="floor" id="floor-1-516"><ul>';
        results.forEach(function(piece) {
            if (piece.building == 500) {
				if (piece.floorId != floorCounter500) {
					html500 += '</ul></section>';

					while (floorCounter500 - piece.floorId > 1) {
						floorCounter500 -= 1;
						html500 += '<section class="floor" id="floor-'+ floorCounter500 +'-500">';
						if (floorCounter500 == 1) {
							html500 += tmpl("500_welcome_message", piece);
						}
						html500 +='</section>';
					}

					html500 += '<section class="floor" id="floor-'+ piece.floorId +'-500"><ul>';
					floorCounter500 -= 1;
				}
				html500 += tmpl("piece_tmpl", piece);
			}
			else if (piece.building == 1414) {
				if (piece.floorId != floorCounter1414) {
					html1414 += '</ul></section>';

					while (floorCounter1414 - piece.floorId > 1) {
						floorCounter1414 -= 1;
						html1414 += '<section class="floor" id="floor-'+ floorCounter1414 +'-1414">';
						/*if (floorCounter1414 == 1) {
							html1414 += tmpl("1414_welcome_message", piece);
						}*/
						html1414 +='</section>';
					}

					html1414 += '<section class="floor" id="floor-'+ piece.floorId +'-1414"><ul>';
					floorCounter1414 -= 1;
				}
				html1414 += tmpl("piece_tmpl", piece);
			}
			else {
				
			}
            

        });
		html516 += document.getElementById("516_welcome_message").innerHTML
		
        html500 += '</ul></section></div>';
		html1414 += '</ul></section></div>';
		html516 += '</ul></section></div>';
		html += html500;
		html += html1414;
		html += html516;
		piece_list.html(html);
    });

  setScroll();
    
  }

  function getPiece(objectId) {
      var objectId = objectId;

      $.parse.get("pieces", { 'objectId': objectId }, function(json) {

        var results, html;

        results = json.results;
        html = "";

        if (results.length === 0) {
            return false;
        }

        results.forEach(function(task) {
            html += tmpl("piece_detail_tmpl", task);
        });
        piece_detail.html(html);
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



